FROM node:16.14-alpine

WORKDIR /app

COPY ./package.json ./yarn.lock /app/

RUN yarn install

COPY . /app/

CMD ["yarn", "run", "start:dev"]