const { promisify } = require('util');
const fs = require('fs');

module.exports = {
  readDir: promisify(fs.readdir),
  readFile: promisify(fs.readFile),
  writeFile: promisify(fs.writeFile),
  stat: promisify(fs.stat),
  mkdir: promisify(fs.mkdir),
};

