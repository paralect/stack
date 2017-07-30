const path = require('path');
require('app-module-path').addPath(path.join(__dirname, '../'));

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = require('config');
const Koa = require('koa');

const app = new Koa();
require('./config/koa')(app);


app.listen(config.port, config.ip, () => {
  console.warn('Koa server listening on %d, in %s mode', config.port, process.env.NODE_ENV);
});

module.exports = app;
