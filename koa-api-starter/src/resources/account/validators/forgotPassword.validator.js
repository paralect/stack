const baseValidator = require('resources/base.validator');
const schema = require('./forgotPassword.updateSchema');

exports.validate = ctx => baseValidator(ctx, async () => {
  const result = schema.apply(ctx, ctx.request.schema);
  return result;
});
