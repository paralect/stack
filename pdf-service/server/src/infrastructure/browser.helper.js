const puppeteer = require('puppeteer');

let browserPromise;

exports.getBrowser = () => {
  if (browserPromise) {
    return browserPromise;
  }

  browserPromise = puppeteer.launch({
    ignoreHTTPSErrors: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });

  return browserPromise;
};

exports.closeBrowser = (browser) => {
  if (!browser || !browserPromise) {
    return Promise.resolve();
  }

  browserPromise = null;
  return browser.close();
};
