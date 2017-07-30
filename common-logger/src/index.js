const winston = require('winston');

module.exports.createConsoleLogger = ({ isDev = false }) => {
  const transports = [];
  transports.push(new winston.transports.Console({
    colorize: true,
    humanReadableUnhandledException: true,
    json: !isDev,
    level: isDev ? 'debug' : 'info',
  }));

  const logger = new winston.Logger({
    exitOnError: false,
    transports,
  });

  logger.debug('[logger] Configured console based logger');

  return logger;
};
