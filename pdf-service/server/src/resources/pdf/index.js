const router = require('koa-router')();
const controller = require('./pdf.controller');

router.post('/', controller.generatePdf);

module.exports = router.routes();
