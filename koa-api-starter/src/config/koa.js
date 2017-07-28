const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const helmet = require('koa-helmet');
const validate = require('koa-validate');
const logger = require('koa-logger');

const routes = require('./routes');


module.exports = (app) => {
  app.use(cors());

  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ['\'self\''],
      styleSrc: ['\'self\'', 'maxcdn.bootstrapcdn.com'],
    },
  }));

  app.use(bodyParser({ enableTypes: ['json', 'form', 'text'] }));

  app.use(logger());

  validate(app);

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
    }
  });

  routes(app);
};
