const userService = require('resources/user/user.service');
const baseValidator = require('resources/base.validator');
const securityUtil = require('security.util');

module.exports = ctx => baseValidator(ctx, async () => {
  let isPasswordMatch;

  ctx.checkBody('email').isEmail('Please enter a valid email address')
    .trim()
    .toLow();
  ctx.checkBody('password').isLength(5, 20, 'Password must be 6-20 characters')
    .notEmpty()
    .trim();

  // If errors alredy exists - return early, to avoid unnesessary db calls
  if (ctx.errors.length > 0) {
    return false;
  }

  const user = await userService.findOne({ email: ctx.request.body.email });

  if (user) {
    isPasswordMatch = await securityUtil
      .compareTextWithHash(ctx.request.body.password, user.passwordHash, user.passwordSalt);
  } else {
    ctx.errors.push({ email: 'User with such email doesn\'t exist' });
  }

  if (!isPasswordMatch) {
    ctx.errors.push({ password: 'Invalid password' });
  }

  return {
    userId: user ? user._id : null,
    email: user ? user.email : null,
    isEmailVerified: user ? user.isEmailVerified : null,
  };
});
