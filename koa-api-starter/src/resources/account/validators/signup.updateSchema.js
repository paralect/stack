const Joi = require('joi.util');

const settings = require('app.settings');

const schema = {
  firstName: Joi.string()
    .trim()
    .options({
      language: {
        any: { empty: '!!Your first name must be longer then 1 letter' },
      },
    }),
  lastName: Joi.string()
    .trim()
    .options({
      language: {
        any: { empty: '!!Your last name must be longer then 1 letter' },
      },
    }),
  email: Joi.string()
    .email(settings.emailOptions)
    .trim()
    .lowercase()
    .options({
      language: {
        string: { email: '!!Please enter a valid email address' },
        any: { empty: '!!Email is required' },
      },
    }),
  password: Joi.string()
    .trim()
    .min(6)
    .max(20)
    .options({
      language: {
        string: {
          min: '!!Password must be 6-20 characters',
          max: '!!Password must be 6-20 characters',
        },
        any: { empty: '!!Password is required' },
      },
    }),
};

exports.apply = (ctx, data) => {
  return Joi.validate(data, schema);
};
