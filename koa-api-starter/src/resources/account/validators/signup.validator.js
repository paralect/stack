const userService = require('resources/user/user.service');

const baseValidator = require('resources/base.validator');
const schema = require('./signup.updateSchema');

exports.validate = ctx => baseValidator(ctx, async () => {
  const result = schema.apply(ctx, ctx.request.body);
  if (result.error) {
    return result;
  }

  const userExists = await userService.exists({ email: ctx.request.body.email });
  if (userExists) {
    ctx.errors.push({ email: 'User with this email is already registered.' });
    return false;
  }

  return result;
});
