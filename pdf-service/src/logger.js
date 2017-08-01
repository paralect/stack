const config = require('config');
const createConsoleLogger = require('@paralect/common-logger').createConsoleLogger;

module.exports = createConsoleLogger({ isDev: config.isDev });
