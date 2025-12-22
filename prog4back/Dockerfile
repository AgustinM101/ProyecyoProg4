FROM php:8.2-apache

RUN docker-php-ext-install pdo pdo_mysql mysqli

# FORZAR un solo MPM (prefork)
RUN a2dismod mpm_event mpm_worker || true \
 && a2enmod mpm_prefork rewrite

# Copiar SOLO lo necesario
COPY index.php /var/www/html/index.php
COPY app /var/www/html/app
COPY src /var/www/html/src
COPY .htaccess /var/www/html/.htaccess

RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
