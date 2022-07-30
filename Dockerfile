FROM node:16-alpine

COPY package*.json ./

RUN npm install

ADD . .

EXPOSE 3000

RUN [ "npm","run","build" ]

CMD [ "npm","run", "start" ]