FROM node:8.2

EXPOSE 3000
COPY ["./package.json", "./package-lock.json", ".eslintrc.js", ".eslintignore", "/app/"]
RUN cd /app && npm i --quiet

COPY ["./src/client/package.json", "./src/client/package-lock.json", "./src/client/.eslintrc.js", "./src/client/.eslintignore", "/app/src/client/"]
RUN cd /app/src/client && npm i --quiet

WORKDIR /app
COPY ./src /app/src
COPY ./src/client/src /app/src/client/src

RUN npm run build-client
CMD npm start
