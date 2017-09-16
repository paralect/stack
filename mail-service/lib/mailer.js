const mailgun = require('mailgun-js');
const assert = require('assert');

const logger = global.logger;

class Mailer {
  constructor(config) {
   assert.ok(config.apiKey);
   assert.ok(config.domain);

    this._mailgun = mailgun(config);
  }

  send(data) {
    return new Promise((resolve, reject) => {
      this._mailgun.messages().send(data, (err, body) => {
        if (err) {
          logger.error('Email hasn\'t been sent...', err);
          return reject(err);
        }
        return resolve(body);
      });
    });
  }
}

module.exports = Mailer;
