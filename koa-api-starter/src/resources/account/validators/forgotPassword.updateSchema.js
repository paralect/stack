const Joi = require('joi.util');

const settings = require('app.settings');

const schema = {
  email: Joi.string()
    .email(settings.emailOptions)
    .trim()
    .lowercase()
    .options({
      language: {
        any: { empty: '!!Email is required' },
        string: { email: '!!Please enter a valid email address' },
      },
    }),
};

exports.apply = (ctx, data) => {
  return Joi.validate(data, schema);
};
