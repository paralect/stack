const inquirer = require('inquirer');

const fs = require('./promiseFs');
const enums = require('./enums');
const { getAbsoluteDirPath } = require('./utils');

module.exports.askSourcesFolder = () => {
  const questions = [
    {
      name: 'htmlFolder',
      type: 'input',
      message: 'Enter path to your html folder (you can use absolute or relative path):',
      validate(value) {
        const done = this.async();

        if (!value.length) {
          return done('Please path to enter your html folder');
        }
        const htmlPath = getAbsoluteDirPath(value);

        return fs.stat(htmlPath)
          .then((stats) => {
            if (!stats.isDirectory()) {
              return done(`Please enter a folder. Your path is ${htmlPath}`);
            }

            return done(null, true);
          }).catch((err) => {
            done(`${enums.SYSTEM_ERRORS[err.code] || err.message}. Your path is ${htmlPath}`);
          });
      },
    },
    {
      name: 'stylesFolder',
      type: 'input',
      message: 'Enter path to your styles folder (optional):',
      validate(value) {
        const done = this.async();

        if (value.length) {
          const stylesPath = getAbsoluteDirPath(value);
          return fs.stat(stylesPath)
            .then((stats) => {
              if (!stats.isDirectory()) {
                return done(`Please enter a folder. Your path is ${stylesPath}`);
              }

              return done(null, true);
            }).catch((err) => {
              done(`${enums.SYSTEM_ERRORS[err.code] || err.message}. Your path is ${stylesPath}`);
            });
        }

        return done(null, true);
      },
    },
  ];

  return inquirer.prompt(questions);
};
