const getValidator = require('./validators/get.validator.js');
const indexService = require('./index.service');


module.exports.get = async (ctx) => {
  const data = await getValidator(ctx);

  if (!data.isValid) {
    return;
  }

  ctx.body = await indexService.get();
};
