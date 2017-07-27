const idGenerator = require('./idGenerator');
const MongoServiceError = require('./MongoServiceError');

class MongoQueryService {
  constructor(collection, options = {}) {
    this._collection = collection;
    this._options = options;
  }

  /**
  * @return {string} name of the colleciton
  **/
  get name() {
    return this._collection.collectionName;
  }

  /**
  * Works as find, but also return paged results if page > 0
  * More documentation: https://automattic.github.io/monk/docs/collection/find.html
  *
  * @param query {string} mongo search query
  * @param opt.perPage {Number} number of items to return per page
  * @param opt.page {Number} a page number to return
  *
  * @return {pagesCount, results, count} {Object} - number of pages,
  * list of items and total count of all matched items
  */
  async find(query = {}, opt = { perPage: 100, page: 0 }) {
    const options = opt;
    const hasPaging = options.page > 0;
    const perPage = options.perPage;
    if (hasPaging) {
      options.skip = (options.page - 1) * perPage;
      options.limit = perPage;
    }
    delete opt.perPage;
    delete opt.page;

    const results = await this._collection.find(query, options);
    if (!hasPaging) {
      return {
        results,
      };
    }

    const count = await this._collection.count(query)
    const pagesCount = Math.ceil(count / perPage) || 1;

    return {
      pagesCount,
      results,
      count,
    };
  }

  /**
  * Finds one document, if multiple returned - throws an error
  *
  * @param query {Object} - search query
  * @param options {Object} - search options, such fields and others
  *
  * @return {Object} - returns a document from the database
  **/
  async findOne(query = {}, options = {}) {
    const data = await this.find(query, options);
    if (data.results.length > 1) {
      throw new MongoServiceError(
        MongoServiceError.MORE_THAN_ONE,
        `findOne: More than one document return for query ${JSON.stringify(query)}`
      );
    }

    return data.results.length === 1 ? data.results[0] : null;
  }

  /**
  * Count documents by query
  *
  * @param query {Object} - search query
  * @return {Number} - number of documents matched by query
  **/
  count(query) {
    return this._collection.count(query);
  }

  /**
  * Returns distinct values by query
  *
  * @param field {String} - field name
  * @param query {Object} - search query
  * @return {Array} - distinct values of given field
  **/
  distinct(field, query) {
    return this._collection.distinct(field, query);
  }

  /**
  * Checks if document exists by specified query
  *
  * @param query {string} - search query
  * @return {Boolean}
  **/
  async exists(query) {
    const count = await this.count(query)
    return count > 0;
  }

  /**
  * Run mongodb aggregation query
  * More documentation: https://docs.mongodb.com/manual/meta/aggregation-quick-reference
  *
  * @param pipeline {Array} - aggregation pipeline
  * @return {Object} - aggregation result
  **/
  aggregate(pipeline) {
    return this._collection.aggregate(pipeline);
  }

  /**
  * Generates mongodb id string
  **/
  generateId() {
    return idGenerator.generate();
  }

  /**
   * Wait, until certain document added or removed from database
   * Intented to be used for tests
   *
   * @param {options.timeout} wait timeout, throw when execeeded. Default: 10000
   * @param {options.tick} interval between db calls. Default: 50
   * @param {expectNoDocs} wait until number of documents by query is equal to 0
   * (good to use to wait until entity is deleted). Default: false
   *
   * @returns {Promise.promise|*}
   */
  expectDocument(query, options = {
    timeout: 10000,
    tick: 50,
    expectNoDocs: false,
  }) {
    let totalTicked;
    let intervalId;
    const self = this;
    return new Promise((resolve, reject) => {
      intervalId = setInterval(() => {
        self.count(query)
          .then((count) => {
            if (options.expectNoDocs && count === 0) {
              clearInterval(intervalId);
              resolve();
            } else if (!options.expectNoDocs && count > 0) {
              clearInterval(intervalId);
              resolve();
            }

            if (totalTicked > options.timeout) {
              clearInterval(intervalId);
              reject(new Error(`Timeout while waiting for query: ${JSON.stringify(query)}`));
            }

            totalTicked += options.tick;
          })
          .catch((err) => {
            reject(err);
          });
      }, options.tick);
    });
  }
}

module.exports = MongoQueryService;
