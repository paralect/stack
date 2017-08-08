const fs = require('./promiseFs');
const enums = require('./enums');
const path = require('path');
const chalk = require('chalk');

function validateWorkingDir(value) {
  if (!value.length) {
    return Promise.reject('Please path to enter your html folder');
  }
  const workingDir = path.resolve(value);

  return fs.stat(workingDir)
    .then((stats) => {
      if (!stats.isDirectory()) {
        return Promise.reject(`Please enter a folder. Your path is ${workingDir}`);
      }

      return Promise.resolve(value);
    }).catch((err) => {
      Promise.reject(`${enums.SYSTEM_ERRORS[err.code] || err.message}. Your path is ${workingDir}`);
    });
}

function validatePagePath(value) {
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

module.exports = ({ workingDir, pagePath, resultOutput }) => {
  return Promise.all([
    validateWorkingDir(workingDir),
    validatePagePath(pagePath),
  ])
    .catch((err) => {
      console.error(chalk.red('Invalid arguments', err.message, err.stack));
      throw err;
    })
    .then(() => ({
      workingDir: path.resolve(workingDir),
      pagePath: path.resolve(pagePath),
      resultOutput: {
        path: path.resolve(resultOutput.path || `${process.cwd()}/out`),
        filename: resultOutput.filename || 'index.pdf',
      },
    }));
};
