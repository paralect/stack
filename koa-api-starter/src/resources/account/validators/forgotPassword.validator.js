const baseValidator = require('resources/base.validator');

module.exports = ctx => baseValidator(ctx, async () => {
  ctx.checkBody('email').isEmail('Please enter a valid email address')
    .trim()
    .toLow();

  // If errors alredy exists - return early, to avoid unnesessary db calls
  if (ctx.errors.length > 0) {
    return false;
  }

  return {
    email: ctx.request.body.email,
  };
});
