FROM node:18-alpine as builder

WORKDIR /app

COPY . .

RUN npm i 

RUN npm run build




FROM nginx:1.21 as production
ENV NODE_ENV production

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]