FROM zenika/alpine-chrome:with-node
USER root
RUN npm install
CMD [ "npm", "start" ]
