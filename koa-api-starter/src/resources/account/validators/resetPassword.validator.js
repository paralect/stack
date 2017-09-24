const baseValidator = require('resources/base.validator');
const schema = require('./resetPassword.updateSchema');

const userService = require('resources/user/user.service');

exports.validate = ctx => baseValidator(ctx, async () => {
  const result = schema.apply(ctx, ctx.request.schema);
  if (result.error) {
    return result;
  }

  const user = await userService.findOne({ resetPasswordToken: ctx.request.body.token });
  if (!user) {
    ctx.errors.push({ token: 'Token is invalid' });
    return false;
  }

  return {
    value: {
      userId: user._id,
      password: ctx.request.body.password,
    },
  };
});
