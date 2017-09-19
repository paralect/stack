Pdf service client side
===========
This is the client side of **Pdf service** description.
The main aim of this part is to build html file with inline css, font and images.
To use it you should [start the server](../server/README.md) first.

Index
===========
  1. [Options](#options)
  2. [Output](#output)
  3. [Commands](#commands)
  4. [Example](#example)

Options
=======
Constructor options. When you initialize pdf service you can specify several options:
``` javascript
const pdfService = new PdfService({
  serverUrl: 'http://localhost:4444', // optional
  mode: 'development', // optional
});
```

  1. **serverUrl** - you can provide url to [server](../server/README.md) (look options sections [here](https://www.npmjs.com/package/wkhtmltopdf)). **http://localhost:3000** will be used as default.
  2. **mode** - mode can be **production** or **development**. In production mode you have to build assets before you invoke generatePdf method.

Pdf service provide generatePdf method to generate pdf documents. This method can use several params:
``` javascript
// Definition
pdfService.generatePdfpagePath(pagePath, options)

// Example
pdfService.generatePdf(`${__dirname}/src/index.html`,  // required
{
  pdfOptions: {  // optional
    format: 'Letter',
  },
  headers: {  // optional
    Authorization: 'Bearer ...'
  },
  templateParams: {  // optional
    tagline: 'Future is near!!!',
  },
})
```

Let's describe these options:
  1. **pagePath** - it is the path to **html** file which will be transformed to pdf.
  2. **pdfOptions** - you can provide pdf options (look options sections [here](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions)).
  3. **headers** - you can provide headers which will be used on the page, for examle you can add authorization header (look [here](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagesetextrahttpheadersheaders))
  4. **templateParams** - if you are using handlebars template then you can provide properties which wis used on template.

This method returns **stream** with your pdf file.

**Note:** You page that was specified by **pagePath** should be placed with all assets in one directory.
 This directory should be isolated from other codebase.
 You have this restriction because build of all assets looks for all files that was placed in the same directory with your html source.
 Look to [Example](#example) for more details.

Output
===========
As the result several files will be generated in the **resultOutput** directory.
**resultOutput** - is the name of directory where you html source is located + '-out' string.
For example, if your source directory has got name src  **resultOutput** will be src-out.
Let's describe what will be in  **resultOutput** directory:
 1. **html file** - it is the html that was sent to pdf [server](../server/README.md).
  The styles, images and fonts in these html files should be inlined.
  If you didn't find some inlined asset please create an [issue](https://github.com/startupsummer/service-stack/issues)
 2. **css file** - this file contains bundle of all collected styles.
 3. **pdf file** - it is the result pdf file.
 4. **js file** - it is the **webpack** bundle.js file.

Commands
========
Pdf service provide several commands for developer.

### pdf-service-watch

This command is provide two update all changes that you made with your assets.
This will be helpful for developer.
You can start to create you html for pdf without any additional
infrastructure and changes in assets automatically regenerate new pdf.

``` javascript
// Definition
pdf-service-watch -u "serverUrl" -p "pagePath" -t "templateParams"

// Example
pdf-service-watch -u "http://localhost:4444" -p "./src/index.html" -t "./templateParams.json"
```

Let' describe all params:
 1. **-u or --serverUrl** - it is the url to pdf service server.
 2. **-p or --pagePath** - path to your html source.
 3. **-t or --templateParams** - json file that contains template params if you are using handlebars.

### pdf-service-build

This command is useful for building your html assets on production env.

``` javascript
// Definition
pdf-service-build -p "pagePath" "pagePath" "pagePath" "pagePath"

// Example
pdf-service-build -p "./report/index.html" "./receipt/index.html"
```

It has got one param **-p or --pagePaths** which can take multiple params.
These params are source pages for building html result.

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

That's all folks!
