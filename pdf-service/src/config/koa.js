const cors = require('kcors');
const helmet = require('koa-helmet');
const requestLogger = require('koa-logger');
const validate = require('koa-validate');

const logger = global.logger;
const routes = require('./routes');

module.exports = (app) => {
  app.use(cors());
  app.use(helmet());
  app.use(requestLogger());

  validate(app);

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      logger.error(err);
      this.status = err.status || 500;
      this.body = {
        errors: [{ _global: 'An error has occurred' }],
      };
      this.app.emit('error', err, this);
    }
  });

  routes(app);
};
