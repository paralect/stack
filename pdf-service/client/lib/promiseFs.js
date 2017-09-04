const { promisify } = require('util');
const fs = require('fs');

const stat = promisify(fs.stat);
const exists = path => stat(path).then(() => true).catch(() => false);

module.exports = {
  readDir: promisify(fs.readdir),
  readFile: promisify(fs.readFile),
  writeFile: promisify(fs.writeFile),
  stat,
  exists,
  mkdir: promisify(fs.mkdir),
  __fs: fs,
};

