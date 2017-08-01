const baseValidator = require('resources/base.validator');

module.exports = ctx => baseValidator(ctx, async () => {
  ctx.checkQuery('url').notEmpty();

  return {
    url: ctx.query.url,
  };
});
