const userService = require('resources/user/user.service');
const baseValidator = require('resources/base.validator');

module.exports = ctx => baseValidator(ctx, async () => {
  ctx.checkParams('token').notEmpty('Token is required');

  if (ctx.errors.length > 0) {
    return false;
  }

  const user = await userService.findOne({ signupToken: ctx.params.token });

  if (!user) {
    ctx.errors.push({ token: 'Token is invalid' });
    return false;
  }

  return {
    userId: user._id,
  };
});
