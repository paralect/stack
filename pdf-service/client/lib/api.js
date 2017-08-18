const fs = require('./promiseFs');
const chalk = require('chalk');
const path = require('path');
const fetchService = require('./fetchService');
const logger = require('./logger');
const Handlebars = require('handlebars');

const compileHtml = (html, templateParams) => {
  const compiledHtml = Handlebars.compile(html);
  return compiledHtml(templateParams);
};

const getOutPaths = (resultOutput) => {
  return {
    htmlPath: `${resultOutput.path}/index.html`,
    pdfPath: `${resultOutput.path}/${resultOutput.filename}`,
  };
};

const readFile = async (filePath, templateParams) => {
  try {
    const html = (await fs.readFile(filePath)).toString('binary');

    return {
      html: compileHtml(html, templateParams),
    };
  } catch (err) {
    logger.error(chalk.red('Something irreparable happened !!!\n', 'When read file'));
    throw err;
  }
};

const getPdf = (file, wkhtmltopdfOptions, serverUrl) => {
  try {
    return fetchService.fetchPdf(file.html, wkhtmltopdfOptions, serverUrl);
  } catch (err) {
    logger.error(chalk.red('Something irreparable happened !!!\n', 'When get pdf file'));
    throw err;
  }
};

const writePdf = async (outPdf, pdfStream) => {
  try {
    return pdfStream.pipe(fs.__fs.createWriteStream(path.resolve(outPdf)));
  } catch (err) {
    logger.error(chalk.red('Something irreparable happened !!!\n', 'When write pdf to file'));
    throw err;
  }
};

module.exports = { getOutPaths, readFile, getPdf, writePdf };
