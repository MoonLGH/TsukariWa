FROM zenika/alpine-chrome:with-node
FROM node:16
FROM browserless/chrome
FROM heroku/heroku:20
COPY . .
RUN npm install
CMD [ "npm", "start" ]
