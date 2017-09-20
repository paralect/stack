const Handlebars = require('handlebars');
const fs = require('./promiseFs');

module.exports = async (templatePath, templateParams) => {
  const template = await fs.readFile(templatePath);

  const compiledHtml = Handlebars.compile(template.toString());
  return compiledHtml(templateParams);
};
