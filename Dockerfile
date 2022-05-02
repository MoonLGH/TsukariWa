FROM zenika/alpine-chrome:with-node
FROM node:12-slim
FROM browserless/chrome
FROM heroku/heroku:20
COPY . .
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - 
RUN apt-get install -y nodejs
RUN npm install
CMD [ "npm", "start" ]
