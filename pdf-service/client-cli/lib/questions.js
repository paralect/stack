const inquirer = require('inquirer');

const fs = require('./promiseFs');
const enums = require('./enums');
const path = require('path');
const { PathPrompt } = require('inquirer-path');

inquirer.prompt.registerPrompt('path', PathPrompt);

module.exports.askSourcesFolder = () => {
  const questions = [
    {
      name: 'htmlFolder',
      type: 'path',
      message: 'Enter path to your html folder (you can use absolute or relative path):',
      validate(value) {
        const done = this.async();

        if (!value.length) {
          return done('Please path to enter your html folder');
        }
        const htmlPath = path.resolve(value);

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
      type: 'path',
      message: 'Enter path to your styles folder (optional):',
      validate(value) {
        const done = this.async();

        if (value.length) {
          const stylesPath = path.resolve(value);
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
