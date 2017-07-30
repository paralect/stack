const controller = require('./account.controller');
const router = require('koa-router')();

router.post('/signup', controller.signup);
router.get('/verifyEmail/:token', controller.verifyEmail);
router.post('/signin', controller.signin);
router.post('/forgotPassword', controller.forgotPassword);
router.put('/resetPassword', controller.resetPassword);
router.get('/logout', controller.logout);
router.post('/resend', controller.resendVerification);

module.exports = router.routes();
