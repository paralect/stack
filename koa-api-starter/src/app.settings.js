module.exports = {
  joiOptions: {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: {
      objects: true,
    },
  },
  emailOptions: {
    minDomainAtoms: 2,
  },
};
