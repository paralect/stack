const userService = require('resources/user/user.service');
const baseValidator = require('resources/base.validator');

module.exports = ctx => baseValidator(ctx, async () => {
  ctx.checkBody('firstName').isLength(1, 'Your first name must be longer then 1 letter')
    .trim();
  ctx.checkBody('lastName').isLength(1, 'Your last name must be longer then 1 letter')
    .trim();
  ctx.checkBody('email').isEmail('Please enter a valid email address')
    .trim()
    .toLow();
  ctx.checkBody('password')
    .isLength(6, 20, 'Password must be 6-20 characters')
    .trim();

  // If errors alredy exists - return early, to avoid unnesessary db calls
  if (ctx.errors.length > 0) {
    return false;
  }

  const userExists = await userService.exists({ email: ctx.request.body.email });
  if (userExists) {
    ctx.errors.push({ email: 'User with this email is already registered.' });
  }

  return {
    firstName: ctx.request.body.firstName,
    lastName: ctx.request.body.lastName,
    email: ctx.request.body.email,
    password: ctx.request.body.password,
  };
});
