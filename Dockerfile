FROM node:16-alpine

COPY package*.json ./

RUN npm install

ADD . .

EXPOSE 3000

CMD [ "npm","run","dev" ]
