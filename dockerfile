FROM zenika/alpine-chrome:with-node
USER root
ADD . /usr/src/app
WORKDIR /usr/src/app
RUN npm install
CMD [ "npm", "start" ]