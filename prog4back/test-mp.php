<?php
require_once __DIR__ . '/vendor/autoload.php';

try {
    \MercadoPago\SDK::setAccessToken('TU_ACCESS_TOKEN');
    echo "MercadoPago SDK cargado correctamente";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage();
}
