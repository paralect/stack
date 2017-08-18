const fs = require('./promiseFs');
const enums = require('./enums');
const path = require('path');
const chalk = require('chalk');
const logger = require('./logger');

function validatePagePath(value) {
  if (value === undefined) {
    return Promise.reject('Page path is undefined');
  }

  if (value.length) {
    const pagePath = path.resolve(value);
    return fs.stat(pagePath)
      .then((stats) => {
        if (!stats.isFile()) {
          return Promise.reject(`Please enter a valid page path. Your path is ${pagePath}`);
        }

        return Promise.resolve(value);
      }).catch((err) => {
        Promise.reject(`${enums.SYSTEM_ERRORS[err.code] || err.message}. Your path is ${pagePath}`);
      });
  }

  return Promise.resolve(value);
}

module.exports = ({ pagePath }) => {
  return Promise.all([
    validatePagePath(pagePath),
  ])
    .catch((err) => {
      logger.error(chalk.red('Invalid arguments', err.message || '', err.stack));
      throw err;
    })
    .then(() => {
      const resolvedPagePath = path.resolve(pagePath);
      const workingDir = path.dirname(resolvedPagePath);

      return {
        workingDir,
        pagePath: resolvedPagePath,
        resultOutput: {
          path: `${workingDir}-out`,
          filename: 'index.pdf',
        },
      };
    });
};
