module.exports = {
  entry: './src/client/src/index.js',
  output: {
    path: `${__dirname}/static/`,
    publicPath: '/static/',
    filename: '[name].js',
  },
};
