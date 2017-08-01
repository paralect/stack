FROM node:8.2.1

#download actual wkhtmltopdf version
RUN wget 'https://github.com/wkhtmltopdf/wkhtmltopdf/releases/download/0.12.4/wkhtmltox-0.12.4_linux-generic-amd64.tar.xz'
#extract wkhtmltopdf
RUN tar -xvf wkhtmltox-0.12.4_linux-generic-amd64.tar.xz -C /opt
#remove uneccessary file
RUN rm wkhtmltox-0.12.4_linux-generic-amd64.tar.xz
#set wkhtmltopdf as global
RUN ln -s /opt/wkhtmltox/bin/wkhtmltopdf /usr/bin/wkhtmltopdf

EXPOSE 3000
COPY ["./package.json", "./package-lock.json", ".eslintrc.js", ".eslintignore", "/app/"]
WORKDIR /app
RUN npm i --quiet
COPY ./src /app/src

CMD npm start