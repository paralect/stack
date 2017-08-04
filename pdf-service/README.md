Pdf service by Paralect service-stack
===========
This module can be used for pdf generating (reports, receipts and etc.) from the html sources.

Information
===========
The module is using [wkhtmltopdf](https://www.npmjs.com/package/wkhtmltopdf) under the hood.
It consists of three parts
 - [Server](server/README.md) which makes transformation from html to pdf
 - [Client](client/README.md) - this part prepare your html with assets to [server](server/README.md) transformations
 - [Client-cli](client-cli/README.md) - is the [client](client/README.md) shell