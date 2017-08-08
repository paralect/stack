Pdf service client-cli side
===========
This is the shell for [client side](../client/README.md) of **Pdf service by Paralect service-stack** description.
The main aim of this part is to build html file with inline css, font and images.
To use it you should [start the server](../server/README.md) first.
**Interesting facts** It has got name **pots** which can mean dude in translation from Russian slang.

Index
===========
 1.[Prompts](#options)
 2.[Output](#output)
 3.[Example](#example)

Prompts
===========
When you start **pots** command several questions will be asked :
  1. **Question about html folder** - is the folder where html files are located.
  These html files will be used in pdf transformation.
  This mean that for each html in the folder appropriate pdf will be generated.
  **Note:** Only the first layer of directory will be taken.
  2. **Question about styles folder** - the answer is used for searching styles , compiling them to css(e.g from scss) and fonts inlining.
  3. **Question about out folder** - the answer is used to provide the directory for output files. You can pass not existing directory.

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
![alt text](https://github.com/startupsummer/service-stack/blob/pdf-service/pdf-service/client-cli/sample/video.gif "Example")

