const fs = require('./promiseFs');
const path = require('path');
const { PassThrough } = require('stream');
const fetchService = require('./fetchService');
const logger = require('./logger');
const Handlebars = require('handlebars');

const compileHtml = (html, templateParams, templateHelpers) => {
  Object.keys(templateHelpers).forEach((helperName) => {
    Handlebars.registerHelper(helperName, templateHelpers[helperName](Handlebars));
  });

  const compiledHtml = Handlebars.compile(html);
  return compiledHtml(templateParams);
};

const readFile = async (filePath, templateParams, templateHelpers) => {
  try {
    const html = (await fs.readFile(filePath)).toString('binary');

    return compileHtml(html, templateParams, templateHelpers);
  } catch (err) {
    logger.error('Something irreparable happened !!!\n', 'When read file');
    throw err;
  }
};

const getPdf = (html, wkhtmltopdfOptions, serverUrl) => {
  try {
    return fetchService.fetchPdf(html, wkhtmltopdfOptions, serverUrl);
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

const isProdHtmlExists = (htmlPath) => {
  return fs.exists(htmlPath);
};

const getPdfFromHtml = async ({
  outPaths,
  wkhtmltopdfOptions,
  templateHelpers,
  templateParams,
  serverUrl,
  mode = 'development',
  watch,
}) => {
  const { htmlPath, pdfPath } = outPaths;
  const html = await readFile(htmlPath, templateParams, templateHelpers);

  if (watch) {
    await fs.writeFile(htmlPath, html);
  }

  const pdfStream = getPdf(html, wkhtmltopdfOptions, serverUrl);

  const [devStream, resultStream] = [
    pdfStream.pipe(new PassThrough()),
    pdfStream.pipe(new PassThrough()),
  ];

  if (mode === 'development') {
    await writePdf(pdfPath, devStream);
  }

  return resultStream;
};

module.exports = { getPdfFromHtml, isProdHtmlExists };
