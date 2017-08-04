Pdf service client side
===========
This is the client side of **Pdf service by Paralect service-stack** description.
The main aim of this part is to build html file with inline css, font and images.
To use it you should [start the server]((../server/README.md) first.

Index
===========
 1.[Options](#options)
 2.[Output](#output)
 3.[Example](#example)

Options
===========
You can provide special options:
  1. **htmlFolder** - is the folder where html files are located.
  These html files will be used in pdf transformation.
  This mean that for each html in the folder appropriate pdf will be generated.
  **Note:** Only the first layer of directory will be taken.
  2. **stylesFolder** - this option is used for searching styles , compiling them to css(e.g from scss) and fonts inlining.
  3. **outFolder** - this option is used to provide the directory for output files. You can pass not existing directory.
  If you don't this option then the [process.cwd()](https://nodejs.org/api/process.html#process_process_cwd) will be used as default.
  4. **wkhtmltopdfOptions** - you can provide wkhtmltopdf options (look options sections [here](https://www.npmjs.com/package/wkhtmltopdf)).

Output
===========
As the result the folder html_to_pdf_out_${timestamp} will be generated.
The timestamp here is the Date.now() result at the moment of generation.
This folder should contain:
 1. **html folder** - here are placed htmls that were sent to pdf [server](../server/README.md).
  The styles, images and fonts in these html files should be inlined.
  If you didn't find some inlined asset please create an [issue](https://github.com/startupsummer/service-stack/issues)
 2. **styles folder** - this folder contains bundle of all collected styles.
 3. **pdf folder** - this folder should have all pdf files

Example
===========
You can find the sample in [here](./sample). To run the sample just write sample directory:
```
 node index.js
```
Known issues
===========
Font awesome works not properly after inline scss files.
