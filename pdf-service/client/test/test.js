const fs = require('fs');
const PdfService = require('./../index');

const pdfService = new PdfService({
  serverUrl: 'http://pdf-service:3000',
  mode: 'production',
});

console.log(pdfService);

const pdfParams = {
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
};

const testDirPath = `${__dirname}/test-waste`;

const deleteFolderRecursive = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      const curPath = `${path}/${file}`;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};


describe('Pdf service tests', () => {
  before(() => {
    if (!fs.existsSync(testDirPath)) {
      fs.mkdirSync(testDirPath);
    }
  });

  it('should return correct stream in prod mode', (done) => {
    pdfService.generatePdf(`${__dirname}/view/index.html`, pdfParams)
      .then((pdfStream) => {
        setTimeout(() => {
          const writeStream = pdfStream.pipe(fs.createWriteStream(`${testDirPath}/test.pdf`));

          writeStream.on('finish', () => {
            done();
          });

          writeStream.on('error', (err) => {
            done(err);
          });
        }, 5000);
      });
  });

  after(() => {
    deleteFolderRecursive(testDirPath);
    deleteFolderRecursive(`${__dirname}/view-out`);
  });
});
