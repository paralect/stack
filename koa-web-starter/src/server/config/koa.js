const path = require('path');
const requestLogger = require('koa-logger');
const serve = require('koa-static');
const webpack = require('webpack');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const handlebars = require('handlebars');

const logger = global.logger;

// TODO: check koa-webpack-middleware for updates
const { devMiddleware, hotMiddleware } = require('../koa-webpack-middleware/middleware');
const webpackOptions = require('../../client/src/webpack.config');
const routes = require('./routes');

const pathToStatic = path.join(__dirname, './../../client/src');
handlebars.registerHelper('json', context => JSON.stringify(context));

const configureWebpack = (app) => {
  const webpackMiddlewareOptions = {
    noInfo: false,
    quiet: false,
    hot: true,
    publicPath: webpackOptions.output.publicPath,
    stats: {
      colors: true,
    },
  };

  app.use(devMiddleware(webpack(webpackOptions), webpackMiddlewareOptions));
  app.use(hotMiddleware(webpack(webpackOptions)));
};

module.exports = (app) => {
  app.use(requestLogger());
  app.use(views(pathToStatic, {
    default: 'html',
    map: { html: 'handlebars' },
    options: {
      helpers: {
        json: ctx => JSON.stringify(ctx),
      },
    },
  }));

  app.use(bodyParser());
  configureWebpack(app);

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      logger.error(err);
      this.status = err.status || 500;
      this.body = {
        errors: [{ _global: 'An error has occurred' }],
      };
    }
  });

  app.use(routes);
  app.use(serve(pathToStatic));
};
