const mount = require('koa-mount');

const index = require('resources/index');


module.exports = (app) => {
  app.use(mount('/index', index));
};
