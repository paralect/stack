const MailService = require('./../index');

const mailService = new MailService({
  mode: 'development',
  isSendEmail: false,
  isTest: true,
  savedEmailHtmlPath: __dirname,
  mailgun: {
    apiKey: 'test',
    domain: 'test.info',
  },
  renderConfigs: {
    layoutsDir: 'templates/build',
    root: './',
    viewsDir: 'templates/build',
    defaultLayout: '_email_layout',
  },
});

mailService.send('payment_receipt', {}, {}, {
  from: '',
  to: '',
  bcc: 'andrew@maqpie.com',
  subject: 'Maqpie Payment Receipt',
  attachment: '',
});
