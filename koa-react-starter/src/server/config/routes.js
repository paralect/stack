const path = require('path');
const config = require('config');
const indexRouter = require('koa-router')();
const fs = require('fs');

const staticPath = path.join(__dirname, './../../client/static');
let staticFileNames;
let mainJS;
let mainCSS;

if (!config.isDev) {
  staticFileNames = fs.readdirSync(staticPath);
  mainJS = staticFileNames.find(fileName => path.extname(fileName) === '.js');
  mainCSS = staticFileNames.find(fileName => path.extname(fileName) === '.css');
}

// match all routes but not files (i.e. routes with dots)
indexRouter.get(/^((?!\.).)*$/, async (ctx) => {
  const data = {
    config: {
      apiUrl: config.apiUrl,
    },
    mainCSS: `/static/${mainCSS}`,
    mainJS: `/static/${mainJS || 'main.js'}`,
  };

  return ctx.render('index', data);
});

module.exports = indexRouter.routes();
