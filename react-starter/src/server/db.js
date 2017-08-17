const config = require('config');
const db = require('@paralect/mongo-node8').connect(config.mongo.connection);

module.exports = db;
