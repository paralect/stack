// promisified fs methods
const fs = require('./lib/promiseFs');
const chalk = require('chalk');

// dynamic gulp task
const gulp = require('./lib/gulpTask');

const validate = require('./lib/validate');
const fetchService = require('./lib/fetchService');

const path = require('path');

const readFiles = (fileNames, outPath) => {
  const promises = fileNames.map(async (name) => {
    try {
      const filePath = path.resolve(outPath, name);

      return {
        name,
        html: (await fs.readFile(filePath)).toString('binary'),
      };
    } catch (err) {
      throw err;
    }
  });

  return Promise.all(promises)
    .catch((err) => {
      console.error(chalk.red('Something irreparable happened !!!\n', 'When read files', err.message, err.stack));
      throw err;
    });
};

const getPdfs = (files) => {
  const promises = files.map(async (file) => {
    try {
      const response = await fetchService.fetchPdf(file.html);

      return {
        name: file.name,
        text: await response.buffer(),
      };
    } catch (err) {
      throw err;
    }
  });

  return Promise.all(promises)
    .catch((err) => {
      console.error(chalk.red('Something irreparable happened !!!\n', 'When get pdf files', err.message, err.stack));
      throw err;
    });
};

const writePdfs = (targetDir, fetchedPdfs) => {
  const promises = fetchedPdfs.map(async (file) => {
    try {
      const absolueDirPath = path.resolve(targetDir);

      await fs.mkdir(absolueDirPath);

      const filePath = path.resolve(absolueDirPath, `${path.basename(file.name, '.html')}.pdf`);

      return fs.writeFile(filePath, file.text, { encoding: 'binary' });
    } catch (err) {
      throw err;
    }
  });

  return Promise.all(promises)
    .catch((err) => {
      console.error(chalk.red('Something irreparable happened !!!\n', 'When write pdf to file', err.message, err.stack));
      throw err;
    });
};

module.exports = async ({ htmlFolder, stylesFolder, outFolder = __dirname }) => {
  try {
    const paths = await validate({ htmlFolder, stylesFolder, outFolder });
    const { outHtml, outPdf } = await gulp(paths);
    const fileNames = await fs.readDir(path.resolve(outHtml));
    const files = await readFiles(fileNames, outHtml);
    const fetchedPdfs = await getPdfs(files);
    await writePdfs(outPdf, fetchedPdfs);
  } catch (err) {
    console.log(err);
    console.error(chalk.red('Fatal error happened => exit'));
  }
};
