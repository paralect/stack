const router = require('koa-router')();
const controller = require('./pdf.controller');

router.get('/url', controller.generateByUrl);
router.post('/html', controller.generateByHtml);

module.exports = router.routes();
