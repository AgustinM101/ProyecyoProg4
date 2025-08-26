<?php
date_default_timezone_set('America/Argentina/Buenos_Aires');

// Validacion para externos
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Cargamos configuración de composer
require_once dirname(__DIR__).'/html/vendor/autoload.php';
// Inicializamos el routeador
require_once dirname(__DIR__).'/html/app/Router/Routes.php';
// Inicializamos el autoloader
require_once dirname(__DIR__).'/html/app/Autoloader/Autoloader.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: *');

// Utilizamos la libreria 'Dotenv' para cargar nuestros datos
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load(); 

// Cargamos el autoloader
spl_autoload_register(
    function ($class): void {
        Autoloader::register($class, [
            "src/Service",
            "src/Entity",
            "src/Infrastructure",
            "src/Utils",
            "src/Middleware"
        ]);
    }
);

// Cargamos el routeador
$router = startRouter();

// Obtenemos el URL de donde esta entrando el usuario
$url = $_SERVER["REQUEST_URI"];

$url = explode("?", $url)[0];

try {
    // A partir del URL y del metodo, el Routeador decide por que ruta entrar
    $router->resolve(
        $url,
        $_SERVER['REQUEST_METHOD']
    );
} catch (Exception $e) {   
    $status = 404;

    if ($e->getMessage() == "El usuario no se encuentra autorizado.") {
        $status = 401;
    }

    // Si la ruta no existe, devolvemos un error 404
    header("HTTP/1.0 $status Not Found");
    echo json_encode([
        "status" => $status,
        "message"=> $e->getMessage()
    ]);
}
