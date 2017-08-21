const path = require('path');
const config = require('config');
const indexRouter = require('koa-router')();
const fs = require('fs');

const staticPath = path.join(__dirname, './../../client/src/static');
const staticFileNames = fs.readdirSync(staticPath);
const mainJS = staticFileNames.find(fileName => path.extname(fileName) === '.js');
const mainCSS = staticFileNames.find(fileName => path.extname(fileName) === '.css');

// match all routes but not files (i.e. routes with dots)
indexRouter.get(/^((?!\.).)*$/, async (ctx) => {
  const data = {
    config: {
      apiUrl: config.apiUrl,
    },
    mainCSS: `/static/${mainCSS}`,
    mainJS: `/static/${mainJS}`,
  };

  return ctx.render('index', data);
});

module.exports = indexRouter.routes();
