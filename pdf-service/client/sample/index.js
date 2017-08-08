const getPdfs = require('./../index');

getPdfs({
  workingDir: `${__dirname}/src`,
  pagePath: `${__dirname}/src/index.hbs`,
  resultOutput: { path: `${__dirname}/out`, filename: 'index.pdf' },
  serverUrl: 'http://localhost:4444',
  wkhtmltopdfOptions: {
    pageSize: 'letter',
  },
  customWebpack: {
    override: false,
    config: {},
  },
  templateParams: {
    tagline: 'Future is near!!!',
  },
});
