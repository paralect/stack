const generateValidator = require('./validator/generateValidator');

const { getBrowser, closeBrowser } = require('infrastructure/browser.helper');

module.exports.generatePdf = async (ctx) => {
  const data = await generateValidator(ctx);

  if (!data.isValid) {
    return;
  }

  ctx.type = 'application/pdf';
  ctx.attachment('out.pdf');

  const { url, html, pdfOptions, headers } = data;
  
  const browser = await getBrowser();
  const page = await browser.newPage();

  if (headers && Object.keys(headers).length) {
    await page.setExtraHTTPHeaders(headers);
  }

  if (url) {
    try {
      await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: 100000
      });
      await page.emulateMedia('screen');
    } catch (e) {
      await closeBrowser(browser);
      throw e
    }
  } else if (html) {
    await page.setContent(html)
  }
  
  ctx.body = await page.pdf(
    Object.assign({
      printBackground: true,
      margin: {
        top: '0.4in',
        right: '0.4in',
        bottom: '0.4in',
        left: '0.4in'
      }
    }, pdfOptions)
  );
  await page.close();
};
