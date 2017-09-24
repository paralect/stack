const baseValidator = require('resources/base.validator');
const schema = require('./signin.updateSchema');

const userService = require('resources/user/user.service');
const securityUtil = require('security.util');

exports.validate = ctx => baseValidator(ctx, async () => {
  const result = schema.apply(ctx, ctx.request.body);
  if (result.error) {
    return result;
  }

  const signinData = result.value;

  const user = await userService.findOne({ email: signinData.email });

  if (!user) {
    ctx.errors.push({ email: "User with such email doesn't exist" });
    return false;
  }

  const isPasswordMatch = await securityUtil.compareTextWithHash(
    signinData.password,
    user.passwordHash,
    user.passwordSalt,
  );

  if (!isPasswordMatch) {
    ctx.errors.push({ password: 'Invalid password' });
    return false;
  }

  return {
    value: {
      userId: user._id,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
    },
  };
});
