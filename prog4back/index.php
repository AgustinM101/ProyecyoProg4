<?php
date_default_timezone_set('America/Argentina/Buenos_Aires');

// Cabeceras CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
}

// 1️⃣ Composer
require_once __DIR__ . '/vendor/autoload.php';

// 2️⃣ Dotenv
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// 3️⃣ Autoloader propio
require_once __DIR__ . '/app/Autoloader/Autoloader.php';
spl_autoload_register(function ($class) {
    Autoloader::register($class, [
        "src/Service",
        "src/Entity",
        "src/Infrastructure",
        "src/Utils",
        "src/Middleware"
    ]);
});

// 4️⃣ Router
require_once __DIR__ . '/app/Router/Routes.php';
$router = startRouter();

// Resolver URL
$url = explode("?", $_SERVER["REQUEST_URI"])[0];
try {
    $router->resolve($url, $_SERVER['REQUEST_METHOD']);
} catch (Exception $e) {
    $status = $e->getMessage() == "El usuario no se encuentra autorizado." ? 401 : 404;
    header("HTTP/1.0 $status Not Found");
    echo json_encode([
        "status" => $status,
        "message" => $e->getMessage()
    ]);
}

