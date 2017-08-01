const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: `${__dirname}/client/index.js`,
    invoiceReceipt: `${__dirname}/resources/billing/invoice/invoiceReceipt/view/index.js`,
  },
  output: {
    path: `${__dirname}/static/`,
    publicPath: '/static/',
    staticPath: `${__dirname}/client/static-content/`,
    publicStaticPath: '/static-content/',
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.(js(x)?)$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
        },
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', 'css!less') },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass?sourceMap') },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style',
          'css!postcss!stylus?resolve url'),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss'),
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=5000&name=[name].[hash].[ext]?',
      },
    ],
  },
  noParse: /\.min\.js/,
  postcss: () => [autoprefixer],
  devtool: 'cheap-source-map',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],

  resolve: {
    root: './',
    extensions: ['', '.jsx', '.js'],
    modulesDirectories: ['./', 'node_modules', './client'],
  },
};