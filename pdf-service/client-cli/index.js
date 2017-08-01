const chalk = require('chalk');
const clear = require('clear');
const CLI = require('clui');
const figlet = require('figlet');
const inquirer = require('inquirer');
const Preferences = require('preferences');

const Spinner = CLI.Spinner;
const { promisify } = require('util');
const fs = require('fs');
const gulp = require('./gulpTask');

const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const path = require('path');

const fetch = require('isomorphic-fetch');

const init = () => {
  clear();
  console.log(chalk.yellow(
    figlet.textSync('HTML => PDF', { horizontalLayout: 'full' }),
  ));
};

function getBuildFolder() {
  const questions = [
    {
      name: 'buildFolder',
      type: 'input',
      message: 'Enter your html folder:',
      validate(value) {
        if (value.length) {
          return true;
        }
        return 'Please enter your html folder';
      },
    },
  ];

  return inquirer.prompt(questions);
}

init();
getBuildFolder()
  .then(({ buildFolder }) => gulp(buildFolder))
  .then(() => readDir(path.join(__dirname, './build')))
  .then((files) => {
    const promises = files.map(file => readFile(path.join(__dirname, './build', file)));
    return Promise.all(promises);
  })
  .then((files) => {
    return files.map(file => file.toString('binary'));
  })
  .then((htmls) => {
    console.log(htmls);
    const promises = htmls.map((html) => {
      return fetch('http://localhost:3000/pdf/html', {
        method: 'POST',
        body: JSON.stringify({
          html,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'blob',
      });
    });
    return Promise.all(promises);
  })
  .then((responses) => {
    const promises = responses.map(res => res.buffer());

    return Promise.all(promises);
  })
  .then((texts) => {
    console.log(texts[0].toString());
    const promises = texts.map((text, i) => writeFile(`${i}.pdf`, text, { encoding: 'binary' }));

    return Promise.all(promises);
  });

