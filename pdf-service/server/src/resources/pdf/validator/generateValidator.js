const baseValidator = require('resources/base.validator');

module.exports = ctx => baseValidator(ctx, async () => {
  const { url, html, pdfOptions = {}, headers } = ctx.request.body;

  if (!url && !html) {
    return ctx.errors.push({ arguments: 'Provide url or html in body' });
  }

  return {
    url,
    html,
    pdfOptions,
  };
});
