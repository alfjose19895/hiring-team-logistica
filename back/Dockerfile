FROM php:8.1-apache

RUN apt-get update && apt-get install -y \
    libpng-dev \
    zlib1g-dev \
    libxml2-dev \
    libzip-dev \
    libonig-dev \
    zip \
    curl \
    unzip \
    vim \
    nano \
    && docker-php-ext-configure gd \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-install mysqli \
    && docker-php-ext-install zip \
    && docker-php-source delete \
    && docker-php-ext-install sockets \
    && apt-get update  \
    && apt-get install -y iputils-ping

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN mkdir ./team-logistics

COPY ./ /team-logistics/

WORKDIR /team-logistics/

ADD /.env.example ./.env

RUN composer install --no-interaction --optimize-autoloader

COPY apache/apache2.conf /etc/apache2/apache2.conf
COPY apache/prototype.conf /etc/apache2/sites-available/000-default.conf

RUN ln -s /team-logistics/public /var/www/html/team-logistics
#  \
#     && mkdir storage/temp/

RUN chmod -R 777 /team-logistics/storage

RUN service apache2 restart

RUN php artisan key:generate

RUN chown -R www-data:www-data /var/www/html \
    && a2enmod rewrite


CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND", "-e", "info", "-D", "PORT=8000"]