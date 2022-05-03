FROM zenika/alpine-chrome:with-node
FROM openwa/wa-automate 
ENTRYPOINT []

WORKDIR /usr/src/app
COPY --chown=chrome package.json ./
RUN npm install
COPY --chown=chrome . ./
ENTRYPOINT ["tini", "--"]
CMD [ "npm", "start" ]
