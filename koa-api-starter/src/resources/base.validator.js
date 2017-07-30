module.exports = async function validateRequest(ctx, validateFunction) {
  ctx.errors = [];
  const data = await validateFunction(ctx) || {};
  data.isValid = !ctx.errors.length;

  if (!data.isValid) {
    ctx.body = { errors: ctx.errors };
    ctx.status = 400;
  }

  return data;
};
