const chalk = require('chalk');
const webpackTask = require('./lib/webpackTask');

const validate = require('./lib/validate');
const { readFile, getPdf, writePdf } = require('./lib/api');

const opn = require('opn');

module.exports = class PdfService {
  constructor({ serverUrl = 'http://localhost:3000', mode }) {
    this.serverUrl = serverUrl;
    this.mode = mode === 'production' ? 'production' : 'development';

    this.cache = {};

    this.buildPdfFromHtml = this.buildPdfFromHtml.bind(this);
  }

  async buildPdf(params) {
    const {
      workingDir,
      pagePath,
      resultOutput = {},
      wkhtmltopdfOptions = {},
      templateParams = {},
      customWebpack,
    } = params;

    try {
      const paths = await validate({ workingDir, pagePath, resultOutput });

      if (this.mode === 'development') {
        const watchParams = {
          paths,
          customWebpack,
          templateParams,
          buildPdf: this.buildPdfFromHtml,
        };
        const { htmlPath } = await webpackTask.watch(watchParams);

        opn(htmlPath);
      } else {
        const buildParams = { paths, customWebpack, templateParams };
        const { htmlPath, pdfPath } = await webpackTask.build(buildParams);

        await this.buildPdfFromHtml({ htmlPath, pdfPath, wkhtmltopdfOptions });
      }
    } catch (err) {
      console.error(chalk.red(err.message, err.stack));
      console.error(chalk.red('Fatal error happened => exit'));
    }
  }

  async buildPdfFromHtml({ htmlPath, pdfPath, wkhtmltopdfOptions }) {
    const file = await readFile(htmlPath);
    const fetchedPdf = await getPdf(file, wkhtmltopdfOptions, this.serverUrl);
    await writePdf(pdfPath, fetchedPdf);
  }

  async watch(params) {
    const {
      workingDir,
      pagePath,
      resultOutput = {},
      templateParams = {},
      customWebpack,
    } = params;

    try {
      const paths = await validate({ workingDir, pagePath, resultOutput });
      const watchParams = {
        paths,
        customWebpack,
        templateParams,
        buildPdf: this.buildPdfFromHtml,
      };
      const { htmlPath } = await webpackTask.watch(watchParams);

      opn(htmlPath);
    } catch (err) {
      console.error(chalk.red(err.message, err.stack));
      console.error(chalk.red('Fatal error happened => exit'));
    }
  }
};
