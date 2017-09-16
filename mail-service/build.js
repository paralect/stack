#!/usr/bin/env node
const webpackTask = require('./lib/webpackTask');
const path = require('path');
const fs = require('./lib/promiseFs');
const commandLineArgs = require('command-line-args');
const logger = require('./lib/logger');

process.on('unhandledRejection', (err) => {
  logger.error(err);
});

const optionDefinitions = [
  { name: 'emailTamplates', type: String, alias: 'e', multiple: true },
];

const options = commandLineArgs(optionDefinitions);

if (!options.emailTamplates) {
  throw (Error('Please specify email templates'));
}

const promises = options.emailTamplates.map((emailTemplate) => {
  const pagePath = path.resolve(emailTemplate);
  const workingDir = path.dirname(pagePath);
  const outputDir = path.resolve(path.dirname(workingDir), 'build');

  return webpackTask.build({
    paths: {
      pagePath,
      workingDir: path.dirname(pagePath),
      resultOutput: {
        path: outputDir,
        htmlPath: `${outputDir}/index.html`,
      },
    },
  }).then(() => pagePath);
});

Promise.all(promises).then((paths) => {
  paths.map(async (pagePath) => {
    const workingDir = path.dirname(pagePath);
    const outputDir = path.resolve(path.dirname(workingDir), 'build');
    const stylesPath = path.join(outputDir, 'main.css');
    const bundlePath = path.join(outputDir, 'bundle.js');
    try {
      await fs.unlink(stylesPath);
      await fs.unlink(bundlePath);
    } catch (err) {}  // eslint-disable-line
  });
});
