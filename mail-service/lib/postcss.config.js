module.exports = {
  plugins: [
    require('postcss-import'), // eslint-disable-line
    require('postcss-custom-properties')({ warnings: false }), // eslint-disable-line
    require('postcss-css-reset'), // eslint-disable-line
    require('postcss-nested'), // eslint-disable-line
    require('postcss-custom-media'), // eslint-disable-line
    require('autoprefixer'), // eslint-disable-line
  ],
};