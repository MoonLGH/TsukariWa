FROM zenika/alpine-chrome:with-node
FROM node:12-slim
FROM browserless/chrome
FROM heroku/heroku:20
COPY . .
USER root
RUN npm install
CMD [ "npm", "start" ]
