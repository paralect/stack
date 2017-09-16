const fs = require('./lib/promiseFs');
const path = require('path');
const MailerBuilder = require('./lib/renderer');
const Mailer = require('./lib/mailer');
const logger = require('./lib/logger');

module.exports = class MailService {
  constructor(config = {}) {
    const {
      mode,
      isSendEmail,
      isTest,
      savedEmailHtmlPath,
      mailgun = {},
      renderConfigs = {},
    } = config;

    this.mode = mode === 'production' ? 'production' : 'development';

    this.isSendEmail = !!isSendEmail;
    this.isTest = !!isTest;

    this.savedEmailHtmlPath = savedEmailHtmlPath;

    this.devsEmail = mailgun.devsEmail;

    this.renderConfigs = renderConfigs;

    this.mailer = new Mailer(mailgun);
  }

  async send(templateName, templateData, data = {}) {
    const { emailLogo, supportEmail, subject } = data;

    const emailData = Object.assign({}, data, {
      subject: this.isTest ? `[TEST] ${subject}` : subject,
    });

    const defaultTemplateData = {
      emailLogo,
      supportEmail,
      year: new Date().getFullYear(),
    };

    const fullTemplateData = Object.assign({}, templateData, defaultTemplateData);

    const html = await MailerBuilder.render(templateName, fullTemplateData, this.renderConfigs);

    if (this.isSendEmail) {
      emailData.html = html;
      return this.mailer.send(emailData);
    }

    const tempPath = path.join(this.savedEmailHtmlPath, `./${templateName}.html`);
    logger.debug(`
      Emails disabled. '${data.subject}' email html has been stored at: ${tempPath}.
      The data is: ${JSON.stringify(templateData)}`,
    );

    return fs.writeFile(tempPath, html);
  }
};
