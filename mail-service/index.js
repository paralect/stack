const path = require('path');
const fs = require('./lib/promiseFs');
const render = require('./lib/renderer');
const Mailer = require('./lib/mailer');
const logger = require('./lib/logger');

process.on('unhandledRejection', (err) => {
  logger.error(err);
});

module.exports = class MailService {
  constructor(config = {}) {
    const {
      isSendEmail,
      savedEmailHtmlPath,
      mailgun = {},
      templatesDir,
    } = config;

    this.isSendEmail = !!isSendEmail;
    this.savedEmailHtmlPath = savedEmailHtmlPath;
    this.templatesDir = templatesDir;
    this.mailer = new Mailer(mailgun);
  }

  async send(templateName, templateData, data = {}) {
    const templatePath = path.join(this.templatesDir, templateName);
    const html = await render(templatePath, templateData);

    if (this.isSendEmail) {
      return this.mailer.send(Object.assign(data, { html }));
    }

    if (this.savedEmailHtmlPath) {
      const savedName = path.extname(templateName) ? templateName : `${templateName}.html`;
      const tempPath = path.join(this.savedEmailHtmlPath, savedName);

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
