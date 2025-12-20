FROM php:8.2-apache

# Deshabilitar MPMs incorrectos
RUN a2dismod mpm_event mpm_worker || true

# Habilitar prefork (el correcto para PHP)
RUN a2enmod mpm_prefork rewrite

# Instalar extensiones necesarias
RUN docker-php-ext-install pdo pdo_mysql

WORKDIR /var/www/html

COPY . /var/www/html

RUN chown -R www-data:www-data /var/www/html
