const router = require('koa-router')();
const controller = require('./pdf.controller');

router.get('/url', controller.generateByUrl);

module.exports = router.routes();