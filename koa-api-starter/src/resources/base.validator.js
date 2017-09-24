/**
 *  Validate request and send 400(bad request), when request is not valid
 * @param {object} ctx
 * @param {Function} validateFn
 * @return {object}
 */
module.exports = async (ctx, validateFn) => {
  ctx.errors = [];
  const data = await validateFn(ctx);
  const result = {
    errors: null,
    value: {},
  };

  if (data.error && data.error.details instanceof Array) {
    result.errors = data.error.details.map((error) => {
      const pathLastPart = error.path.slice(error.path.length - error.context.key.length);

      if (pathLastPart === error.context.key) {
        return { [error.path]: error.message };
      }

      return { [error.context.key]: error.message };
    });
  }

  if (typeof data === 'object' && data.value) {
    result.value = data.value;
  }

  if (ctx.errors instanceof Array) {
    if (ctx.errors.length) {
      result.errors = result.errors || [];
      result.errors.push(...ctx.errors);
    }
  } else {
    result.errors = ctx.errors;
  }
  if (result.errors) {
    ctx.status = 400;
    ctx.body = { errors: result.errors };
  }

  return result;
};
