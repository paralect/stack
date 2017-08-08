const getPdfs = require('./../index');

getPdfs({
  workingDir: `${__dirname}/src`,
  pagePath: `${__dirname}/src/index.html`,
  resultOutput: { path: `${__dirname}/out`, filename: 'index.pdf' },
  wkhtmltopdfOptions: {
    pageSize: 'letter',
  },
});
