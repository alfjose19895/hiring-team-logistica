FROM kytel0925/php:8.1-debian-apache-dev

WORKDIR /app
COPY . .

EXPOSE 80
EXPOSE 443

RUN php artisan migrate:fresh

CMD ["/sbin/entrypoint.sh"]