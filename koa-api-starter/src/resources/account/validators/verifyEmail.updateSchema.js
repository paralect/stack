const Joi = require('joi.util');

const schema = {
  token: Joi.string()
    .options({
      language: {
        any: { empty: '!!Token is required' },
      },
    }),
};

exports.apply = (ctx, data) => {
  return Joi.validate(data, schema);
};
