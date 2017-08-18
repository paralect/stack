#!/usr/bin/env node
const PdfService = require('./index');
const commandLineArgs = require('command-line-args');
const path = require('path');

const optionDefinitions = [
  { name: 'pagePath', type: String, alias: 'p', defaultOption: __dirname },
  { name: 'serverUrl', alias: 'u', type: String },
];

const options = commandLineArgs(optionDefinitions);

options.workingDir = path.dirname(options.pagePath);

const pdfService = new PdfService(options);

pdfService.watch(options);
