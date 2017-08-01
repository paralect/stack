const mount = require('koa-mount');
const pdfService = require('resources/pdf');

module.exports = (app) => {
  app.use(mount('/pdf', pdfService));
};
