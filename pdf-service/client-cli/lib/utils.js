const path = require('path');

const getAbsolutePath = (value) => {
  return path.isAbsolute(value) ? value : path.join(process.cwd(), value);
};

const getAbsoluteDirPath = (value) => {
  return path.join(getAbsolutePath(value), '/');
};

module.exports = {
  getAbsolutePath,
  getAbsoluteDirPath,
};
