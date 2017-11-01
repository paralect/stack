module.exports = {
  plugins: [
    require('postcss-import')({ // eslint-disable-line
      root: __dirname,
      path: ['styles'],
    }),
    require('postcss-cssnext'), // eslint-disable-line
    require('cssnano'), // eslint-disable-line
  ],
};
