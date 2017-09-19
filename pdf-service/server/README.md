Pdf service server side
===========
This is server side of **Pdf service by Paralect service-stack** description.
It is the simple HTTP server was written on [koa](http://koajs.com/) which handle POST request:
  [POST /pdf](#post-pdfhtml)
Body of the request should consist of **url** or **html** properties.
 1. **url** - is site url. Server will generate pdf if you provide this option.
 2. **html** - it is html page code. Server will generate pdf from this page.

**Note:** If you provide two properties. Server will generate pdf by url.

To prevent wkhtmltopdf installing server should be [started](#build-and-start-the-server) from docker container.

Build and start the server
===========
Build and start the container.
To build the image of the server you in root server directory you should run:

```
docker build ./
```

After that the docker image will be built.
On the next step you should start the container.
For example, to start the image on 3000 port you can run:

```
docker run -d -p 3000:3000 9519024e532d
```

Also image exposes only 3000 port, so you should use this port when you map ports.

Download from Docker Hub
===========
Image can be loaded from Docker Hub (docker pull paralect/pdf-service).
The reference to this image [here](https://hub.docker.com/r/paralect/pdf-service/).
Here is the sample of using with docker-compose
``` YAML
version: '2'

services:
  pdf-service:
    image: paralect/pdf-service
    ports:
      - "4444:3000"
```
If you place this code to **docker-compose.yml** file then you are able to run it by command:
``` YAML
docker-compose up -d
```

POST /pdf
=========
This request can have a html text and special pdf options (look options sections [here](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions))in body. Also this request can have headers which will be used on the page, for examle you can add authorization header (look [here](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagesetextrahttpheadersheaders))
The sample of request to localhost with Fetch API:

``` javascript
fetch('http://localhost:3000/pdf', {
    method: 'POST',
    body: JSON.stringify({
      pdfOptions,
      html,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'blob',
  });
```

Or if you want to generate pdf by url.

``` javascript
fetch('http://localhost:3000/pdf', {
    method: 'POST',
    body: JSON.stringify({
      pdfOptions,
      "url": "https://google.com",
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'blob',
  });
```

Known issues
===========
If you provide output option the empty html will be generated (also it is related to other options).
