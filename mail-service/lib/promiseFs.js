const { promisify } = require('util');
const fs = require('fs');

const stat = promisify(fs.stat);
const exists = path => stat(path).then(() => true).catch(() => false);

const unlink = promisify(fs.unlink);
const remove = path => unlink(path)
  .catch((err) => {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  });

module.exports = {
  readDir: promisify(fs.readdir),
  readFile: promisify(fs.readFile),
  writeFile: promisify(fs.writeFile),
  unlink,
  remove,
  stat,
  exists,
  mkdir: promisify(fs.mkdir),
  __fs: fs,
};

