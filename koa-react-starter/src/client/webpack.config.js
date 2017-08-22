const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: [
      'babel-polyfill',
      './index.jsx',
    ],
  },

  output: {
    path: `${__dirname}/static/`,
    publicPath: '/static/',
    filename: '[name].[hash].js',
  },

  context: path.resolve(__dirname, './'),

  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: { presets: ['react', 'es2015', 'stage-0'] },
    }, {
      test: /\.pcss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader'],
      }),
    }, {
      test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: ['url-loader?limit=5000&name=[name].[hash].[ext]?'],
    }],
  },

  devtool: 'cheap-source-map',

  resolve: {
    modules: ['./', 'node_modules'],
    extensions: ['.js', '.jsx', '.pcss'],
  },

  plugins: [
    new ExtractTextPlugin({ filename: '[name].[hash].css' }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        BABEL_ENV: JSON.stringify('production'),
      },
    }),
  ],
};
