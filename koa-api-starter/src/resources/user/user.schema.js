const Validator = require('jsonschema').Validator;

const validator = new Validator();

const userSchema = {
  id: '/User',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    createdOn: { type: 'Date' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string' },
    passwordHash: { type: 'string' },
    passwordSalt: { type: 'string' },
    signupToken: { type: 'string' },
    resetPasswordToken: { type: 'string' },
    isEmailVerified: { type: 'Boolean' },
  },
  required: ['_id', 'createdOn', 'email', 'passwordHash', 'passwordSalt',
    'isEmailVerified'],
};

module.exports = obj => validator.validate(obj, userSchema);
