const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const webpack = require('webpack');
const opn = require('opn');
const { getOutPaths } = require('./api');

const getConfig = ({ paths }) => {
  const { workingDir, pagePath, resultOutput } = paths;

  return {
    entry: `${__dirname}/buildByWebpack.js`,
    output: { path: resultOutput.path, filename: 'bundle.js' },
    module: {
      rules: [
        {
          test: /\.(css|pcss)$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  plugins: () => [autoprefixer],
                },
              }],
          }),
        },
        {
          test: /\.(html|hbs)$/,
          use: [
            { loader: 'html-loader', options: { interpolate: true } },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|otf)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: ['url-loader?name=[name].[hash].[ext]&prefix=true?'],
        },
      ],
      noParse: [/\.min\.js/],
    },

    plugins: [
      new ExtractTextPlugin({ filename: '[name].css', allChunks: true }),
      new HtmlWebpackPlugin({
        template: pagePath,
        inlineSource: '.(css|js)$',
      }),
      new HtmlWebpackInlineSourcePlugin(),
    ],

    resolve: {
      alias: {
        'source-htmls': workingDir,
      },
    },
  };
};

const build = ({ paths }) => {
  const config = getConfig({ paths });
  return new Promise((resolve, reject) => {
    return webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        return reject(err);
      }

      return resolve();
    });
  });
};

const watch = ({ paths, templateParams, buildPdf }) => {
  const config = getConfig({ paths });
  const compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.watch({}, async (err, stats) => {
      if (err || stats.hasErrors()) {
        return reject(err);
      }

      const { resultOutput } = paths;
      const { htmlPath, pdfPath } = getOutPaths(resultOutput);

      buildPdf({ outPaths: { htmlPath, pdfPath }, templateParams });
      opn(pdfPath);

      return resolve({ htmlPath, pdfPath });
    });
  });
};

module.exports = { getConfig, build, watch };
