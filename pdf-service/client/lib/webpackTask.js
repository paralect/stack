const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const webpack = require('webpack');
const mergeWith = require('lodash.mergewith');
const opn = require('opn');

function customizer(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }

  return undefined;
}

const getConfig = ({ paths, customWebpack, templateParams }) => {
  const { workingDir, pagePath, resultOutput } = paths;
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

  if (!customWebpack) {
    return defaultConfig;
  }

  if (customWebpack.override) {
    return customWebpack.config;
  }

  return mergeWith(defaultConfig, customWebpack.config, customizer);
};

const build = ({ paths, customWebpack, templateParams }) => {
  const config = getConfig({ paths, customWebpack, templateParams });
  return new Promise((resolve, reject) => {
    return webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        return reject(err);
      }

      const { resultOutput } = paths;
      return resolve({
        htmlPath: `${resultOutput.path}/index.html`,
        pdfPath: `${resultOutput.path}/${resultOutput.filename}`,
      });
    });
  });
};

const watch = ({ paths, customWebpack, templateParams, buildPdf }) => {
  const config = getConfig({ paths, customWebpack, templateParams });
  const compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.watch({}, async (err, stats) => {
      if (err || stats.hasErrors()) {
        return reject(err);
      }

      const { resultOutput } = paths;
      const outPaths = {
        htmlPath: `${resultOutput.path}/index.html`,
        pdfPath: `${resultOutput.path}/${resultOutput.filename}`,
      };

      await buildPdf(outPaths);

      opn(outPaths.pdfPath);

      return resolve(outPaths);
    });
  });
};

module.exports = { getConfig, build, watch };
