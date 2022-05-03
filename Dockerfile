FROM openwa/wa-automate 
ENTRYPOINT []

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . ./
ENTRYPOINT ["tini", "--"]
CMD [ "npm", "start" ]
