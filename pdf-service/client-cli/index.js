// cli packages
const chalk = require('chalk');
const clear = require('clear');
const { Spinner } = require('clui');
const figlet = require('figlet');

// promisified fs methods
const fs = require('./lib/promiseFs');

// dynamic gulp task
const gulp = require('./lib/gulpTask');

const questions = require('./lib/questions');
const fetchService = require('./lib/fetchService');

const path = require('path');

const mapValues = require('lodash.mapvalues');
const { getAbsolutePath, getAbsoluteDirPath } = require('./lib/utils');

const greetings = () => {
  clear();
  console.log(chalk.yellow(
    figlet.textSync('HTML => PDF', { horizontalLayout: 'full' }),
  ));
};

const readFiles = (fileNames, outPath) => {
  const promises = fileNames.map(async (name) => {
    try {
      const filePath = getAbsolutePath(path.join(outPath, name));

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
      const absolueDirPath = getAbsoluteDirPath(targetDir);

      await fs.mkdir(absolueDirPath);

      const filePath = getAbsolutePath(path.join(absolueDirPath, `${file.name}.pdf`));

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

const main = async () => {
  greetings();
  const spinner = new Spinner();
  try {
    const paths = await questions.askSourcesFolder();
    const {
      outHtml,
      outPdf } = await gulp(mapValues(paths, fp => (fp ? getAbsoluteDirPath(fp) : fp)));
    const fileNames = await fs.readDir(getAbsoluteDirPath(outHtml));
    const files = await readFiles(fileNames, outHtml);

    spinner.message('Fetching pdf files');
    spinner.start();
    const fetchedPdfs = await getPdfs(files);
    spinner.stop();

    await writePdfs(outPdf, fetchedPdfs);
  } catch (err) {
    console.error(chalk.red('Fatal error happened => exit'));
  }
};

main();
