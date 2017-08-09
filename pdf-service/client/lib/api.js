const fs = require('./promiseFs');
const chalk = require('chalk');
const path = require('path');
const fetchService = require('./fetchService');

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

module.exports = { readFile, getPdf, writePdf };
