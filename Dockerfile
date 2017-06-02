FROM node:boron

ADD . /usr/src/app
WORKDIR /usr/src/app
RUN yarn install
ENTRYPOINT node demo.js
EXPOSE 8004
