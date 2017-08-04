const fs = require('./promiseFs');
const enums = require('./enums');
const path = require('path');
const chalk = require('chalk');

function validateHtmlFolder(value) {
  if (!value.length) {
    return Promise.reject('Please path to enter your html folder');
  }
  const htmlPath = path.resolve(value);

  return fs.stat(htmlPath)
    .then((stats) => {
      if (!stats.isDirectory()) {
        return Promise.reject(`Please enter a folder. Your path is ${htmlPath}`);
      }

      return Promise.resolve(value);
    }).catch((err) => {
      Promise.reject(`${enums.SYSTEM_ERRORS[err.code] || err.message}. Your path is ${htmlPath}`);
    });
}

function validateStylesFolder(value) {
  if (value.length) {
    const stylesPath = path.resolve(value);
    return fs.stat(stylesPath)
      .then((stats) => {
        if (!stats.isDirectory()) {
          return Promise.reject(`Please enter a folder. Your path is ${stylesPath}`);
        }

        return Promise.resolve(value);
      }).catch((err) => {
        Promise.reject(`${enums.SYSTEM_ERRORS[err.code] || err.message}. Your path is ${stylesPath}`);
      });
  }

  return Promise.resolve(value);
}

module.exports = ({ htmlFolder, stylesFolder, outFolder }) => {
  return Promise.all([
    validateHtmlFolder(htmlFolder),
    validateStylesFolder(stylesFolder),
  ])
    .catch((err) => {
      console.error(chalk.red('Invalid arguments', err.message, err.stack));
      throw err;
    })
    .then(() => ({
      htmlFolder: path.resolve(htmlFolder),
      stylesFolder: path.resolve(stylesFolder),
      outFolder: path.resolve(outFolder),
    }));
};
