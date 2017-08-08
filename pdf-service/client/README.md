Pdf service client side
===========
This is the client side of **Pdf service by Paralect service-stack** description.
The main aim of this part is to build html file with inline css, font and images.
To use it you should [start the server](../server/README.md) first.

Index
===========
  1. [Options](#options)
  2. [Output](#output)
  3. [Webpack Config](#webpack-config)
  4. [Example](#example)

Options
===========
Here is the sample of options which:
``` javascript
{
  workingDir: `${__dirname}/src`, // required
  pagePath: `${__dirname}/src/index.hbs`, // required
  resultOutput: { path: `${__dirname}/out`, filename: 'index.pdf' }, // optional
  serverUrl: 'http://localhost:4444', // optional
  wkhtmltopdfOptions: { // optional
    pageSize: 'letter',
  },
  customWebpack: { // optional
    override: false,
    config: {},
  },
  templateParams: { //optional
    tagline: 'Future is near!!!',
  },
}
```

Let's describe these options:
  1. **workingDir** - it is the folder where all assets is placed.(**should be absolute**)
  2. **pagePath** - it is the path to **html/hbs** file which will be transformed to pdf.(**should be absolute**)
  3. **resultOutput** - consists of two properties (**path** **filename**).
   **path** - it is the directory where all built files will be written(**should be absolute**).
   **filename** - it is the name of pdf result.
  If you don't provide this option then the [process.cwd()](https://nodejs.org/api/process.html#process_process_cwd) will be used as default instead of **path** and **index.pdf** instead of **filename**.
  4. **serverUrl** - you can provide url to [server](../server/README.md) (look options sections [here](https://www.npmjs.com/package/wkhtmltopdf)). **http://localhost:3000** will be used as default.
  5. **wkhtmltopdfOptions** - you can provide wkhtmltopdf options (look options sections [here](https://www.npmjs.com/package/wkhtmltopdf)).
  5. **customWebpack** - if you are :sunglasses: Webpack Maestro :sunglasses: you can try to provide custom config.
  If **override** option is set to true then all default config will be overridden otherwise configs will be merged.
  Merge configs is flexible because you can easily provide one or two additional loaders/plugins without overwriting all config.
  5. **templateParams** - if you are using **hbs** entry then you can provide properties which wis used on template.

Output
===========
As the result several files will be generated in the **resultOutput** folder:
 1. **html file** - it is the html that was sent to pdf [server](../server/README.md).
  The styles, images and fonts in these html files should be inlined.
  If you didn't find some inlined asset please create an [issue](https://github.com/startupsummer/service-stack/issues)
 2. **css file** - this file contains bundle of all collected styles.
 3. **pdf file** - it is the result pdf file.
 4. **js file** - it is the **webpack** bundle.js file.

Webpack Config
===========
Here is the webpack config which is used for bundle building:
``` javascript
{
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
  }
```

If you want to add additional loader or plugin to this configurations but doesn't
want override all config file you can specify **customWebpack** option in this way
``` javascript
{
// other options
  customWebpack: {
    override: false,
    config: {
    plugins: [new MyMegaPlugin()],
    },
  },
// other options
}
```
The result webpack config should look like this:
``` javascript
{
// other webpack config options
   plugins: [
       new ExtractTextPlugin({ filename: '[name].css', allChunks: true }),
       new HtmlWebpackPlugin({
         template: pagePath,
         inlineSource: '.css$',
       }),
       new HtmlWebpackInlineSourcePlugin(),
       new MyMegaPlugin(),
     ],
// other webpack config options
}
```

Example
===========
You can find the sample in [here](./sample). To run the sample just write in sample directory:
```
 docker-compose up -d
 node index.js
```
The first command should start pdf server which listen on **4444** port.
You can specify another port in docker-compose.yml file.
All works in this way:
 1. All assets from **workingDir** are bundled and inlined recursively in the html file by **pagePath**.
 In sample **workingDir** is _sample/src_ directory. And **pagePath** is _sample/src/index.hbs_
 2. Result of bundling is html file is sent to [pdf server](../server/README.md) to **serverUrl**.
 3. Server creates pdf and sent it back to the client.

 That's all folks!

