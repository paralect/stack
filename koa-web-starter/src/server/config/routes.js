const router = require('koa-router')();


router.get('/', async ctx => {
  await ctx.render('index', { info: 'this is index.html' });
});

module.exports = router.routes();
