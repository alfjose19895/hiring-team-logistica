FROM node:alpine

RUN mkdir -p /var/www/dockerized-nuxt/app
WORKDIR /var/www/dockerized-nuxt/app

COPY . .
RUN npm run clean
RUN npx nuxi clean
RUN npm install

EXPOSE 3000

ENV BACKEND_URL=http://code.dev:5050

CMD ["npm", "run", "dev"]