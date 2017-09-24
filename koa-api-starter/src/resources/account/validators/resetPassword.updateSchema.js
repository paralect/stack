const Joi = require('joi.util');

const schema = {
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
