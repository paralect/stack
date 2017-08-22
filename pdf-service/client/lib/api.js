const fs = require('./promiseFs');
const path = require('path');
const fetchService = require('./fetchService');
const logger = require('./logger');
const Handlebars = require('handlebars');

const compileHtml = (html, templateParams) => {
  const compiledHtml = Handlebars.compile(html);
  return compiledHtml(templateParams);
};

const readFile = async (filePath, templateParams) => {
  try {
    const html = (await fs.readFile(filePath)).toString('binary');

    return {
      html: compileHtml(html, templateParams),
    };
  } catch (err) {
    logger.error('Something irreparable happened !!!\n', 'When read file');
    throw err;
  }
};

const getPdf = (file, wkhtmltopdfOptions, serverUrl) => {
  try {
    return fetchService.fetchPdf(file.html, wkhtmltopdfOptions, serverUrl);
  } catch (err) {
    logger.error('Something irreparable happened !!!\n', 'When get pdf file');
    throw err;
  }
};

const writePdf = async (outPdf, pdfStream) => {
  try {
    return new Promise((resolve, reject) => {
      return pdfStream
        .pipe(fs.__fs.createWriteStream(path.resolve(outPdf)))
        .on('finish', resolve)
        .on('error', reject);
    });
  } catch (err) {
    logger.error('Something irreparable happened !!!\n', 'When write pdf to file');
    throw err;
  }
};

module.exports = { readFile, getPdf, writePdf };
