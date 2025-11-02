<?php
// 🕒 Zona horaria
date_default_timezone_set('America/Argentina/Buenos_Aires');

// --- Autoload de Composer ---
require_once __DIR__ . '/../../vendor/autoload.php';

// --- Cargar variables de entorno (.env) ---
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();

// --- Autoload propio (el tuyo) ---
require_once __DIR__ . '/../../app/Autoloader/Autoloader.php';
spl_autoload_register(function ($class) {
    Autoloader::register($class, [
        "src/Service",
        "src/Entity",
        "src/Infrastructure",
        "src/Utils",
        "src/Middleware"
    ]);
});

// --- Importar la clase que queremos probar ---
use Src\Service\Payment\PaymentService;

try {
    $payment = new PaymentService();
    $result = $payment->createPreference(
        "test123",
        "Producto de prueba",
        1000
    );

    echo "✅ Preferencia creada correctamente:\n";
    print_r($result);
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage();
}

