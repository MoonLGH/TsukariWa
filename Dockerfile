FROM zenika/alpine-chrome:with-node
FROM browserless/chrome
FROM heroku/heroku:20
RUN npm install
CMD [ "npm", "start" ]
