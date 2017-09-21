const PdfService = require('./../../index');

const pdfService = new PdfService({
  serverUrl: 'http://localhost:4444',
  mode: 'production',
});

pdfService.generatePdf(`${__dirname}/view/index.html`, {
  pdfOptions: {
    format: 'Letter',
    margin: {
      top: '0mm',
      left: '0mm',
      right: '0mm',
      bottom: '0mm',
    },
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
