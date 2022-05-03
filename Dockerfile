FROM openwa/wa-automate 
ENTRYPOINT []

FROM node:12-slim
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . ./
ENTRYPOINT ["tini", "--"]
CMD [ "npm", "start" ]
