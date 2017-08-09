const PdfService = require('./../index');

const pdfService = new PdfService({
  serverUrl: 'http://localhost:4444',
  mode: 'dvelopment',
});

pdfService.buildPdf({
  workingDir: `${__dirname}/src`,
  pagePath: `${__dirname}/src/index.hbs`,
  resultOutput: { path: `${__dirname}/out`, filename: 'index.pdf' },
  serverUrl: 'http://localhost:4444',
  development: true,
  wkhtmltopdfOptions: {
    pageSize: 'letter',
  },
  customWebpack: {
    override: false,
    config: {},
  },
  templateParams: {
    tagline: 'Future is near!!!',
  },
});
