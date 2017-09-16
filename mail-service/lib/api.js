const fs = require('./promiseFs');
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

const isProdHtmlExists = (htmlPath) => {
  return fs.exists(htmlPath);
};

const getPdfFromHtml = async ({
  outPaths,
  templateHelpers,
  templateParams,
  watch,
}) => {
  const { htmlPath } = outPaths;
  const html = await readFile(htmlPath, templateParams, templateHelpers);

  if (watch) {
    await fs.writeFile(htmlPath, html);
  }

  return html;
};

module.exports = { getPdfFromHtml, isProdHtmlExists };
