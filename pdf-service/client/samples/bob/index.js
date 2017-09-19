const PdfService = require('./../../index');

const pdfService = new PdfService({
  serverUrl: 'http://localhost:4444',
  mode: 'development',
});

pdfService.generatePdf(`${__dirname}/src/index.html`, {
  pdfOptions: {
    format: 'Letter',
  },
  templateParams: {
    tagline: 'Future is near!!!',
  },
});
