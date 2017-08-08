// promisified fs methods
const fs = require('./lib/promiseFs');
const chalk = require('chalk');

// dynamic gulp task
const webpackTask = require('./lib/webpackTask');

const validate = require('./lib/validate');
const fetchService = require('./lib/fetchService');

const path = require('path');

const readFile = async (filePath) => {
  try {
    return {
      html: (await fs.readFile(filePath)).toString('binary'),
    };
  } catch (err) {
    console.error(chalk.red('Something irreparable happened !!!\n', 'When read files'));
    throw err;
  }
};

const getPdf = async (file, wkhtmltopdfOptions, serverUrl) => {
  try {
    const response = await fetchService.fetchPdf(file.html, wkhtmltopdfOptions, serverUrl);

    return {
      text: await response.buffer(),
    };
  } catch (err) {
    console.error(chalk.red('Something irreparable happened !!!\n', 'When get pdf files'));
    throw err;
  }
};

const writePdf = async (outPdf, fetchedPdf) => {
  try {
    const absolueFilePath = path.resolve(outPdf);
    return fs.writeFile(absolueFilePath, fetchedPdf.text, { encoding: 'binary' });
  } catch (err) {
    console.error(chalk.red('Something irreparable happened !!!\n', 'When write pdf to file'));
    throw err;
  }
};

module.exports = async ({
  workingDir,
  pagePath,
  resultOutput,
  serverUrl = 'http://localhost:3000',
  customWebpack,
  wkhtmltopdfOptions = {},
  templateParams = {},
}) => {
  try {
    const paths = await validate({ workingDir, pagePath, resultOutput });
    const { outHtml, outPdf } = await webpackTask(paths, customWebpack, templateParams);
    const file = await readFile(outHtml);
    const fetchedPdf = await getPdf(file, wkhtmltopdfOptions, serverUrl);
    await writePdf(outPdf, fetchedPdf);
  } catch (err) {
    console.error(chalk.red(err.message, err.stack));
    console.error(chalk.red('Fatal error happened => exit'));
  }
};
