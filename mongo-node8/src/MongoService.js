const _ = require('lodash');
const EventEmitter = require('events').EventEmitter;
const MongoQueryService = require('./MongoQueryService');
const idGenerator = require('./idGenerator');
const MongoServiceError = require('./MongoServiceError');

const logger = global.logger;

class MongoService extends MongoQueryService {
  constructor(collection, options = {}, eventBus = new EventEmitter()) {
    super(collection, options);

    this._bus = eventBus;
    this.logger = logger;
    this.atomic = {
      update: (query, updateObject, updateOptions = {}) => {
        return collection.update(query, updateObject, updateOptions);
      },
      findOneAndUpdate: (query, update, updateOptions) => {
        return collection.findOneAndUpdate(query, update, updateOptions);
      },
    };
  }

  _validateSchema(entity) {
    if (this._options.validateSchema) {
      const validationResult = this._options.validateSchema(entity);
      if (validationResult.errors && validationResult.errors.length > 0) {
        logger.error('Schema invalid', JSON.stringify(validationResult.errors, 0, 4));
        throw new MongoServiceError(
          MongoServiceError.INVALID_SCHEMA,
          `Document schema is invalid: ${JSON.stringify(validationResult.errors)}`);
      }
    }
  }

  /**
  * Subscribe to database change events only once. The first time evenName
  * is triggered listener handler is removed and then invoked
  */
  once(eventName, handler) {
    return this._bus.once(eventName, handler);
  }

  /**
  * Subscribe to database change events.
  */
  on(eventName, handler) {
    return this._bus.on(eventName, handler);
  }

  /**
  * Insert one object or array of the objects to the database
  * Publishes `created` event {doc}
  * Sets createdOn to the current date
  *
  * @param {array | object} Object or array of objects to create
  * @return {array | object} Object or array of created objects
  */
  async create(objs) {
    let entities = objs;
    if (!_.isArray(entities)) {
      entities = [entities];
    }

    entities.forEach((item) => {
      const entity = item;
      if (!entity._id) {
        entity._id = idGenerator.generate();
      }
      entity.createdOn = new Date();

      this._validateSchema(entity);
    });

    await this._collection.insert(entities);
    entities.forEach((doc) => {
      this._bus.emit('created', {
        doc,
      });
    });

    return entities.length > 1 ? entities : entities[0];
  }

  /**
  * Modifies entity found by query in the database
  * Publishes `updated` event {doc, prevDoc}
  * Sets updatedOn to the current date
  *
  * @param query {Object} - mongo search query
  * @param updateFn {function(doc)} - function, that recieves document to be updated
  * @return {Object} Updated object
  */
  async update(query, updateFn) {
    if (!_.isFunction(updateFn)) {
      throw new Error('updateFn must be a function');
    }

    const doc = await this.findOne(query);
    if (!doc) {
      throw new MongoServiceError(
        MongoServiceError.NOT_FOUND,
        `Document not found while updating. Query: ${JSON.stringify(query)}`);
    }
    const prevDoc = _.cloneDeep(doc);
    doc.updatedOn = new Date();
    updateFn(doc);
    this._validateSchema(doc);

    await this._collection.update({ _id: doc._id }, doc);

    this._bus.emit('updated', {
      doc,
      prevDoc,
    });

    return doc;
  }

  /**
  * Remove one or many documents found by query
  *
  * @param query {Object} - mongodb search query
  */
  async remove(query) {
    const docsForRemove = await this.find(query);
    await this._collection.remove(query);

    docsForRemove.results.forEach((doc) => {
      this._bus.emit('removed', {
        doc,
      });
    });

    return docsForRemove;
  }

  /**
  * Create or check index existence, omits error
  *
  * @param index {Object} - index to be created
  * @param options {Object} - index options
  */
  ensureIndex(index, options) {
    return this._collection.ensureIndex(index, options)
      .catch((err) => {
        this.logger.warn(err);
      });
  }

  createOrUpdate(query, updateFn) {
    return this.exists(query)
      .then((exists) => {
        if (exists) {
          return this.update(query, updateFn);
        }
        const doc = query;
        updateFn(doc);
        return this.create(doc);
      });
  }

  findOneAndUpdate(query, update, options = { returnOriginal: false }) {
    let originalDoc;
    return this.findOne(query)
      .then((doc) => {
        originalDoc = doc;

        return this._collection.findOneAndUpdate(query, update, options);
      })
      .then((doc) => {
        if (originalDoc) {
          this._bus.emit('updated', {
            doc,
            prevDoc: originalDoc,
          });
        } else {
          this._bus.emit('created', {
            doc,
          });
        }

        return doc;
      });
  }

  /**
   * Deep compare doc & prevDoc from 'updated' event. When
   * something changed - executes callback
   *
   * @param  {Array|Object} properties - see deepCompare
   * @param  {Function} callback - executes callback if something changed
   */
  onPropertiesUpdated(properties, callback) {
    return this.on('updated', (evt) => {
      const data = evt.doc;
      const initialData = evt.prevDoc;
      const isChanged = MongoService.deepCompare(data, initialData, properties);
      if (isChanged) {
        callback(evt);
      }
    });
  }

  /**
   * Deep compare data & initialData. When
   * something changed - executes callback
   *
   * @param  {Array|Object} properties
   * 1) Array of properties to compare. For example: ['user.firstName', 'companyId']
   * 2) Object of properties {'user.firstName': 'John'} - will check if property changed and equal
   * to 'John' in updated document.
   * Note: . (dot) is used to compare deeply nested properties
   * @return {Boolean} - indicates if something has changed
   */
  static deepCompare(data, initialData, properties) {
    let changed = false;

    if (Array.isArray(properties)) {
      changed = _.find(properties, (prop) => {
        const value = _.get(data, prop);
        const initialValue = _.get(initialData, prop);

        return !_.isEqual(value, initialValue);
      }) !== undefined;
    } else {
      Object.keys(properties).forEach((prop) => {
        if (changed) {
          return;
        }
        const value = _.get(data, prop);
        const initialValue = _.get(initialData, prop);

        if ((value === properties[prop])
          && (initialValue !== properties[prop])) {
          changed = true;
        }
      });
    }

    return changed;
  }
}

module.exports = MongoService;
