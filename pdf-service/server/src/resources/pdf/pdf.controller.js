const generateValidator = require('./validator/generateValidator');
const wkhtmltopdf = require('wkhtmltopdf');

module.exports.generatePdf = async (ctx) => {
  const data = await generateValidator(ctx);

  if (!data.isValid) {
    return;
  }

  ctx.type = 'application/pdf';
  ctx.attachment('out.pdf');

  const { url, html, wkhtmltopdfOptions } = data;

  if (url) {
    ctx.body = wkhtmltopdf(url, wkhtmltopdfOptions);
    return;
  }

  ctx.body = wkhtmltopdf(
    html,
    Object.assign(wkhtmltopdfOptions, { debug: true, debugJavascript: true }),
  );
};
