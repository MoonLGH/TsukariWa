FROM openwa/wa-automate 
ENTRYPOINT []

USER root
RUN apk add --no-cache tini make gcc g++ python3 git nodejs nodejs-npm yarn
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . ./
ENTRYPOINT ["tini", "--"]
CMD [ "npm", "start" ]
