const generateByUrlValidator = require('./validator/genrateByUrlValidator');
const wkhtmltopdf = require('wkhtmltopdf');

module.exports.generateByUrl = async (ctx) => {
  const data = await generateByUrlValidator(ctx);

  if (!data.isValid) {
    return;
  }

  ctx.type = 'application/pdf';
  ctx.attachment('out.pdf');

  ctx.body = wkhtmltopdf(data.url);
};

module.exports.generateByHtml = async (ctx) => {
  ctx.type = 'application/pdf';
  ctx.attachment('out.pdf');
  const {
    html,
    wkhtmltopdfOptions = {},
  } = ctx.request.body;

  console.log(wkhtmltopdfOptions);

  ctx.body = wkhtmltopdf(html, wkhtmltopdfOptions);
};
