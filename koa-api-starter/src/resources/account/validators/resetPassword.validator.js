const baseValidator = require('resources/base.validator');
const userService = require('resources/user/user.service');

module.exports = ctx => baseValidator(ctx, async () => {
  ctx.checkBody('password').isLength(6, 20, 'Password must be 6-20 characters')
    .notEmpty()
    .trim();

  if (ctx.errors.length > 0) {
    return false;
  }

  const user = await userService.findOne({ resetPasswordToken: ctx.request.body.token });

  if (!user) {
    ctx.errors.push({ token: 'Token is invalid' });
    return false;
  }

  return {
    userId: user._id,
    password: ctx.request.body.password,
  };
});
