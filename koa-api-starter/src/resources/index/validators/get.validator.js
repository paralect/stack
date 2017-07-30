const baseValidator = require('resources/base.validator.js');


module.exports = ctx => baseValidator(ctx, async () => {
  const name = ctx.query.name;

  if (!name) {
    ctx.errors.push({ name: 'Name is empty!' });
  }

  return {
    name,
  };
});
