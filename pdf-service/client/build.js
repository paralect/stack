#!/usr/bin/env node
const webpackTask = require('./lib/webpackTask');
const validate = require('./lib/validate');

const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { name: 'pagePaths', type: String, alias: 'p', multiple: true, defaultOption: [`${__dirname}/index.html`] },
];

const options = commandLineArgs(optionDefinitions);

options.pagePaths.map(async (pagePath) => {
  const paths = await validate({ pagePath });
  await webpackTask.build({ paths });
});
