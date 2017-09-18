#!/usr/bin/env node
const webpackTask = require('./lib/webpackTask');
const commandLineArgs = require('command-line-args');
const fs = require('./lib/promiseFs');
const path = require('path');
const builder = require('./lib/renderer');
const logger = require('./lib/logger');
const opn = require('opn');

process.on('unhandledRejection', (err) => {
  logger.error(err);
});

const optionDefinitions = [
  { name: 'pagePath', type: String, alias: 'p' },
  { name: 'templateParams', alias: 't', type: String },
  { name: 'layoutsDir', alias: 'l', type: String },
  { name: 'root', alias: 'r', type: String, defaultOption: './' },
  { name: 'viewsDir', alias: 'v', type: String },
  { name: 'defaultLayout', alias: 'd', type: String },
];

const options = commandLineArgs(optionDefinitions);

if (!options.pagePath) {
  throw (Error('page path is required'));
}

if (!options.layoutsDir) {
  throw (Error('layouts dir is required'));
}

if (!options.root) {
  throw (Error('root path is required'));
}

if (!options.viewsDir) {
  throw (Error('views dir is required'));
}

if (!options.defaultLayout) {
  throw (Error('default layout is required'));
}

if (options.templateParams) {
  options.templateParams = require(path.resolve(options.templateParams)); // eslint-disable-line
}

const pagePath = path.resolve(options.pagePath);
const workingDir = path.dirname(pagePath);
const outputDir = path.resolve(path.dirname(workingDir), 'build');

return webpackTask.watch({
  paths: {
    pagePath,
    workingDir: path.dirname(pagePath),
    resultOutput: {
      path: outputDir,
      htmlPath: `${outputDir}/index.html`,
    },
  },
}, async () => {
  const {
    layoutsDir,
    root,
    viewsDir,
    defaultLayout,
  } = options;

  const data = await builder.render(path.basename(pagePath), options.templateParams || {}, {
    layoutsDir,
    root,
    viewsDir,
    defaultLayout,
  });

  const watchHtml = path.join(outputDir, '/tmp-html.html');
  await fs.writeFile(watchHtml, data);

  opn(watchHtml);
});

