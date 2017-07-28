const router = require('koa-router')();

const controller = require('./index.controller');


router.get('/', controller.get);

module.exports = router.routes();
