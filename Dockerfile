FROM node:10.9.0-alpine as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

#! Install the build requirements for bcrypt
RUN apk update && apk upgrade \
  && apk --no-cache add --virtual builds-deps build-base python \
  && npm i node-gyp node-pre-gyp

# Install dependencies
RUN npm install --production=true --quiet && \
    npm cache clean --force

# Copy the server files over
COPY . /usr/src/app/

FROM node:10.9.0-alpine

# Create and set the working directory
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

# Copy the server from the build container
COPY --from=builder /usr/src/app /usr/src/app

EXPOSE 8080 3000

CMD npm run prod

#//-----------------------------
FROM node:13.3.0-alpine

WORKDIR /usr/src/app

#install dependencies
COPY package.json .

RUN npm install --quiet && \
    npm cache clean --force
#RUN npm rebuild node-sass
#isntall nodemon for development mode
#RUN npm install nodemon -g --quiet

COPY . .

EXPOSE 8080

CMD npm run start:dev
#CMD ["node", "src/index.js"]