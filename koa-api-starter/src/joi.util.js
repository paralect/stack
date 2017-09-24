const Joi = require('joi');
const settings = require('app.settings');

const customJoi = Object.assign({}, Joi);

/**
 * @desc Validate data using specified schema
 * @param {object} data
 * @param {object} schema
 * @param {object} options
 * @return {object}
 */
customJoi.validate = (data, schema, options = {}) => {
  return Joi.validate(
    data,
    schema,
    Object.assign({}, settings.joiOptions, options),
  );
};

module.exports = customJoi;
