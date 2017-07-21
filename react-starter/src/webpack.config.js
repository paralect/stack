module.exports = {
  entry: './index.jsx',

  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: { presets: ['react', 'es2015', 'stage-0'] },
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
};
