FROM node:lts-alpine

RUN npm install -g http-server

RUN mkdir /client

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD [ "http-server", "dist" ]