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
      savedEmailHtmlPath,
      mailgun = {},
      renderConfigs = {},
    } = config;

    this.mode = mode === 'production' ? 'production' : 'development';

    this.isSendEmail = !!isSendEmail;

    this.savedEmailHtmlPath = savedEmailHtmlPath;

    this.devsEmail = mailgun.devsEmail;

    this.renderConfigs = renderConfigs;

    this.mailer = new Mailer(mailgun);
  }

  async send(templateName, templateData, data = {}) {
    const html = await MailerBuilder.render(templateName, templateData, this.renderConfigs);

    if (this.isSendEmail) {
      return this.mailer.send(Object.assign(data, { html }));
    }

    if (this.savedEmailHtmlPath) {
      const tempPath = path.join(this.savedEmailHtmlPath, `./${templateName}.html`);

      logger.debug(`
      Emails disabled. '${data.subject}' email html has been stored at: ${tempPath}.
      The data is: ${JSON.stringify(templateData)}`,
      );

      return fs.writeFile(tempPath, html);
    }

    logger.debug(`
      Emails disabled.
      The data is: ${JSON.stringify(templateData)}`,
    );

    return null;
  }
};
