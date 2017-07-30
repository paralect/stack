const Promise = require('bluebird');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const randomBytes = Promise.promisify(crypto.randomBytes, crypto);
const bcryptHash = Promise.promisify(bcrypt.hash, bcrypt);
const compare = Promise.promisify(bcrypt.compare, bcrypt);

/**
* Generates random string, useful for creating secure tokens
*
* @return {string} - random string
*/
module.exports.generateSecureToken = function generateSecureToken() {
  return randomBytes(48).then(buf => buf.toString('hex'));
};

/**
* Generate hash from any string. Could be used to generate a hash from password
*
* @param text {string} - a text to produce hash from
* @return {string} - a hash from input text
*/
module.exports.getHash = function getHash(text, salt = '') {
  return bcryptHash(`${text[0]}${salt}${text.slice(1)}`, 10);
};

module.exports.generateSalt = function generateSalt() {
  return randomBytes(16).then(buf => buf.toString('hex'));
};

/**
* Compares if text and hash are equal
*
* @param text {string} - a text to compare with hash
* @param hash {string} - a hash to compare with text
* @param salt {string} - a salt which will add to password
* @return {boolean} - are hash and text equal
*/
module.exports.compareTextWithHash = function compareTextWithHash(text, hash, salt) {
  return compare(`${text[0]}${salt}${text.slice(1)}`, hash);
};

module.exports.generateShaHash = function generateShaHash(text, shaSecret) {
  return crypto.createHmac('sha256', shaSecret).update(text).digest('hex');
};
