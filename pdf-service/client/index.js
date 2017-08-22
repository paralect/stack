const webpackTask = require('./lib/webpackTask');

const validate = require('./lib/validate');
const { readFile, getPdf, writePdf } = require('./lib/api');
const logger = require('./lib/logger');

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

      if (this.mode === 'development') {
        await webpackTask.build({ paths });
      }

      return this.getPdfFromHtml({
        outPaths: paths.resultOutput,
        wkhtmltopdfOptions,
        templateParams,
      });
    } catch (err) {
      logger.error(err.message, err.stack);
      logger.error('Fatal error happened => exit');

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
      logger.error(err);
      logger.error('Fatal error happened => exit');
    }
  }
};
