const userService = require('resources/user/user.service');

const baseValidator = require('resources/base.validator');
const schema = require('./verifyEmail.updateSchema');

exports.validate = ctx => baseValidator(ctx, async () => {
  const result = schema.apply(ctx, ctx.request.body);
  if (result.error) {
    return result;
  }

  const user = await userService.findOne({ signupToken: ctx.params.token });

  if (!user) {
    ctx.errors.push({ token: 'Token is invalid' });
    return false;
  }

  return {
    value: {
      userId: user._id,
    },
  };
});
