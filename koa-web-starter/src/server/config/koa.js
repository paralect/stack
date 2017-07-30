const path = require('path');
const views = require('koa-views');
const logger = require('koa-logger');
const serve = require('koa-static');
const handlebars = require('handlebars');
const webpack = require('webpack');
const bodyParser = require('koa-bodyparser');

const config = require('config');
// TODO: check koa-webpack-middleware for updates
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware/middleware');
const webpackOptions = require('client/src/webpack.config');
const routes = require('./routes');


const pathToStatic = path.join(__dirname, './../../client/src');

module.exports = app => {
  app.use(views(pathToStatic), {
    default: 'html',
    map: { html: 'handlebars' },
    options: {
      helpers: {
        json: ctx => JSON.stringify(ctx)
      },
    },
  });

  app.use(bodyParser());

  app.use(serve(pathToStatic));

  app.use(logger());

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
    }
  });

  app.use(devMiddleware(webpack(webpackOptions)));

  app.use(hotMiddleware(webpack(webpackOptions)));

  app.use(routes);
};
