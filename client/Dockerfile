FROM node:alpine

RUN mkdir -p /app
WORKDIR /app

COPY . .
RUN npm run clean
RUN npx nuxi clean
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]