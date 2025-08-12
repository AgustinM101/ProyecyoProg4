<?php

// Cargamos configuración de composer
require_once dirname(__DIR__).'/html/vendor/autoload.php';
// Inicializamos el routeador
require_once dirname(__DIR__).'/html/app/Router/Routes.php';
// Inicializamos el autoloader
require_once dirname(__DIR__).'/html/app/Autoloader/Autoloader.php';

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:GET,POST,PUT,DELETE,OPTIONS');
header('Access-Control-Allow-Headers:*');

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
            "src/Category",
            "src/Utils"
        ]);
    }
);

// Cargamos el routeador
$router = startRouter();

// Obtenemos el URL de donde esta entrando el usuario
$url = $_SERVER["REQUEST_URI"];

try {
    // A partir del URL y del metodo, el Routeador decide por que ruta entrar
    $router->resolve(
        $url,
        $_SERVER['REQUEST_METHOD']
    );
} catch (Exception $e) {   
    // Si la ruta no existe, devolvemos un error 404
    header("HTTP/1.0 404 Not Found");
    echo json_encode([
        "status" => 404,
        "message"=> $e->getMessage()
    ]);
}
