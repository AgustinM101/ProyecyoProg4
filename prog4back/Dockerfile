FROM php:8.2-apache

# Timezone
ENV TZ=UTC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Apache
RUN a2enmod rewrite

# App
COPY . /var/www/html/
RUN chown -R www-data:www-data /var/www/html
