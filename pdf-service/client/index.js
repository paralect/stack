const chalk = require('chalk');
const webpackTask = require('./lib/webpackTask');

const validate = require('./lib/validate');
const { getOutPaths, readFile, getPdf, writePdf } = require('./lib/api');
const logger = require('./lib/logger');

const fs = require('./lib/promiseFs');

const opn = require('opn');

process.on('unhandledRejection', (err) => {
  logger.error(err);
});

module.exports = class PdfService {
  constructor({ serverUrl = 'http://localhost:3000', mode }) {
    this.serverUrl = serverUrl;
    this.mode = mode === 'production' ? 'production' : 'development';

    this.getPdfFromHtml = this.getPdfFromHtml.bind(this);
  }

  async generatePdf(pagePath, params) {
    const {
      wkhtmltopdfOptions = {},
      templateParams = {},
    } = params;

    try {
      const paths = await validate({ pagePath });

      const { htmlPath, pdfPath } = getOutPaths(paths.resultOutput);

      if (this.mode === 'development') {
        await webpackTask.build({ paths });
      }

      return this.getPdfFromHtml({
        outPaths: { htmlPath, pdfPath },
        wkhtmltopdfOptions,
        templateParams,
      });
    } catch (err) {
      logger.error(chalk.red(err.message, err.stack));
      logger.error(chalk.red('Fatal error happened => exit'));

      return null;
    }
  }

  async getPdfFromHtml({ outPaths, wkhtmltopdfOptions, templateParams }) {
    const { htmlPath, pdfPath } = outPaths;

    const file = await readFile(htmlPath, templateParams);
    const pdfStream = getPdf(file, wkhtmltopdfOptions, this.serverUrl);

    if (this.mode === 'development') {
      await writePdf(pdfPath, pdfStream);
    }

    return pdfStream;
  }

  async watch(pagePath, params) {
    const {
      templateParams = {},
      wkhtmltopdfOptions = {},
    } = params;

    try {
      const paths = await validate({ pagePath });
      const watchParams = {
        paths,
        wkhtmltopdfOptions,
        templateParams,
        buildPdf: this.getPdfFromHtml,
      };

      const { htmlPath } = await webpackTask.watch(watchParams);

      opn(htmlPath);
    } catch (err) {
      logger.error(chalk.red(err.message, err.stack));
      logger.error(chalk.red('Fatal error happened => exit'));
    }
  }
};
