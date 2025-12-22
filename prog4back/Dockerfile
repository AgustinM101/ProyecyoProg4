FROM php:8.2-apache

# Apagar MPMs que NO se usan
RUN a2dismod mpm_event mpm_worker || true \
 && a2enmod mpm_prefork rewrite

# Extensiones PHP
RUN docker-php-ext-install pdo pdo_mysql mysqli

# Copiar el backend
COPY . /var/www/html/

RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
