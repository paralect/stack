const cors = require('kcors');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');
const requestLogger = require('koa-logger');
const validate = require('koa-validate');

const logger = global.logger;
const routes = require('./routes');

module.exports = (app) => {
  app.use(cors());
  app.use(helmet());
  app.use(requestLogger());
  app.use(bodyParser({
    enableTypes: ['json', 'text'],
    jsonLimit: '2GB' },
  ));

  validate(app);

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      logger.error(err);
      ctx.status = err.status || 500;
      ctx.body = {
        errors: [{ _global: 'An error has occurred' }],
      };
      ctx.app.emit('error', err, ctx);
    }
  });

  routes(app);
};
