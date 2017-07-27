const idGenerator = require('./idGenerator');
const _ = require('lodash');

class EntityTestBuilder {
  constructor(service) {
    this.service = service;
    this.data = {
      _id: idGenerator.generate(),
    };
  }

  getEntity() {
    return this.data;
  }

  getService() {
    return this.service;
  }

  create() {
    return this.service.create(this.data);
  }

  update() {
    const query = {
      _id: this.data._id,
    };

    return this.service.update(query, (doc) => {
      _.merge(doc, this.data);
    });
  }

  remove() {
    const query = {
      _id: this.data._id,
    };

    return this.service.remove(query);
  }
}

module.exports = EntityTestBuilder;
