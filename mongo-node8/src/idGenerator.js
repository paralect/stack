const monk = require('monk');

module.exports.generate = function generate() {
  return monk.id().toHexString();
};
