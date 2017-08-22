const PdfService = require('./../../index');

const pdfService = new PdfService({
  serverUrl: 'http://localhost:4444',
  mode: 'development',
});

pdfService.generatePdf(`${__dirname}/view/index.html`, {
  wkhtmltopdfOptions: {
    pageSize: 'letter',
    T: '0mm',
    L: '0mm',
    R: '0mm',
    B: '0mm',
  },
  templateParams: {
    invoice: {
      paidOn: '2017-08-22',
      totalAmount: 100000,
      creditCard: {
        type: 'VISA',
        last4: '4357',
      },
      activeUsers: 'Artem',
      transaction: {
        amount: 12000,
        _id: 123,
      },
      appName: 'Pdf Service',
      from: '2017-07-22',
      to: '2017-08-22',
      items: [
        {
          description: 'Spinners',
          amount: 13000,
        },
        {
          description: 'Vape',
          amount: 12000,
        },
      ],
    } },
});
