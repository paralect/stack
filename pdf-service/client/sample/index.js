const getPdfs = require('./../index');

getPdfs({
  htmlFolder: __dirname,
  stylesFolder: `${__dirname}/styles`,
  outFolder: `${__dirname}/out`,
});
