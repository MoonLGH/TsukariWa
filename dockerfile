FROM zenika/alpine-chrome:with-node

ARG NEXT_PUBLIC_FATHOM_CODE
ARG NEXT_PUBLIC_SITE_URL

# Create app directory
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

# Install deps
RUN npm i

# Bundle app source
COPY . .

# Start
CMD [ "npm", "start" ]