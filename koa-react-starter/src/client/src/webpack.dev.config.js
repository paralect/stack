const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: [
      'babel-polyfill',
      'webpack-hot-middleware/client?reload=true&path=/__webpack_hmr&timeout=20000',
      './index.jsx',
    ],
  },

  output: {
    path: `${__dirname}/static/`,
    publicPath: '/static/',
    filename: '[name].js',
  },

  context: path.resolve(__dirname, './'),

  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: { presets: ['react', 'es2015', 'stage-0', 'react-hmre'] },
    }, {
      test: /\.pcss$/,
      loaders: ['style-loader', 'css-loader', 'postcss-loader'],
    }],
  },

  devtool: 'source-map',

  resolve: {
    modules: ['./', 'node_modules'],
    extensions: ['.js', '.jsx', '.pcss'],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
