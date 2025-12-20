FROM php:8.2-apache

# Instalar extensiones necesarias para MySQL
RUN docker-php-ext-install pdo pdo_mysql

# Habilitar rewrite (rutas tipo /plans)
RUN a2enmod rewrite

# Copiar el proyecto
COPY . /var/www/html/

# Permisos
RUN chown -R www-data:www-data /var/www/html
