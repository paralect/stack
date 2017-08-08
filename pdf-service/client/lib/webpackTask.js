const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const webpack = require('webpack');
const path = require('path');
const mergeWith = require('lodash.mergewith');

function customizer(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }

  return undefined;
}

const getConfig = ({ workingDir, pagePath, resultOutput }, customWebpack, templateParams) => {
  const defaultConfig = {
    entry: `${__dirname}/buildByWebpack.js`,
    output: { path: resultOutput.path, filename: 'bundle.js' },
    module: {
      rules: [
        { test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader' },
              { loader: 'resolve-url-loader' },
              { loader: 'sass-loader', query: { sourceMap: true } },
            ],
          }) },
        { test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  plugins: () => [autoprefixer],
                },
              }],
          }) },
        { test: /\.(html|hbs)$/,
          use: [
            { loader: 'html-loader', options: { interpolate: true } },
            { loader: 'handlebars-render-loader', options: { data: templateParams } },
          ],
        },
        { test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|otf)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: ['url-loader?name=[name].[hash].[ext]&prefix=true?'] },
      ],
      noParse: [/\.min\.js/],
    },

    plugins: [
      new ExtractTextPlugin({ filename: '[name].css', allChunks: true }),
      new HtmlWebpackPlugin({
        template: pagePath,
        inlineSource: '.css$',
      }),
      new HtmlWebpackInlineSourcePlugin(),
    ],

    resolve: {
      alias: {
        'source-htmls': workingDir,
      },
    },
  };

  if (!customWebpack) {
    return defaultConfig;
  }

  if (customWebpack.override) {
    return customWebpack.config;
  }

  return mergeWith(defaultConfig, customWebpack.config, customizer);
};

module.exports = ({ workingDir, pagePath, resultOutput }, customWebpack, templateParams) => {
  const config = getConfig({ workingDir, pagePath, resultOutput }, customWebpack, templateParams);
  return new Promise((resolve, reject) => {
    return webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        console.log(err, stats);
        return reject(err);
      }
      return resolve({
        outHtml: `${resultOutput.path}/index.html`,
        outPdf: `${resultOutput.path}/${resultOutput.filename}`,
      });
    });
  });
};
