Pdf service server side
===========
This is server side of **Pdf service by Paralect service-stack** description.
It is the simple HTTP server was written on [koa](http://koajs.com/) which handle two requests:
 1. [GET  /pdf/url](#get--pdfurl)
 2. [POST /pdf/html](#post-pdfhtml)

To prevent wkhtmltopdf installing server should be [started](#build-and-start-the-server) from docker container.

Build and start the server
===========
Build and start the container.
To build the image of the server you in root server directory you should run:

```
docker build ./
```

After that the docker image will be built.
On the next step you should start the container with the proper NODE_ENV.
For example, to start the image in development mode on 3000 port you can run:

```
docker run -d -e "NODE_ENV=development" -p 3000:3000 9519024e532d
```
There are two possible NODE_ENV:
 1. development
 2. production

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
    environment:
      - NODE_ENV=development
    ports:
      - "4444:3000"
```
If you place this code to **docker-compose.yml** file then you are able to run it by command:
``` YAML
docker-compose up -d
```

GET  /pdf/url
===========
This request need to have a url query param. If this query param was provided the html will be generated.
The sample of request to localhost:

```
http://localhost:3000/pdf/url?url=https://google.com
```

POST /pdf/html
===========
This request can have a html text and special wkhtmltopdf options (look options sections [here](https://www.npmjs.com/package/wkhtmltopdf))in body.
The sample of request to localhost with Fetch API:

``` javascript
fetch('http://localhost:3000/pdf/html', {
    method: 'POST',
    body: JSON.stringify({
      wkhtmltopdfOptions,
      html,
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
