<?php

require_once __DIR__ . '/../vendor/autoload.php';

// ✅ Cargar variables de entorno desde .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->safeLoad();

include_once "Route.php";
include_once "Router.php";

function startRouter(): Router 
{
    $routes = [];

    include_once "Routes/PlanAlimentoRoutes.php";
    $routes = array_merge($routes, PlanAlimentoRoutes::getRoutes());

    include_once "Routes/PlanEjercicioRoutes.php";
    $routes = array_merge($routes, PlanEjercicioRoutes::getRoutes());

    include_once "Routes/PlanRoutes.php";
    $routes = array_merge($routes, PlanRoutes::getRoutes());

    include_once "Routes/UserRoutes.php";
    $routes = array_merge($routes, UserRoutes::getRoutes());

    include_once "Routes/PlansUserRoutes.php";
    $routes = array_merge($routes, PlansUserRoutes::getRoutes());

    include_once "Routes/FileRoutes.php";
    $routes = array_merge($routes, FileRoutes::getRoutes());

    include_once "Routes/PlansFormRoutes.php";
    $routes = array_merge($routes, PlansFormRoutes::getRoutes());

    include_once "Routes/PaymentRoutes.php";
    $routes = array_merge($routes, PaymentRoutes::getRoutes());


    include_once "Routes/LogsRoutes.php";
    $routes = array_merge($routes, LogRoutes::getRoutes());

    $routesClass = [];
    foreach ($routes as $route) {
        $routesClass[] = Route::fromArray($route);
    }

    return new Router($routesClass);
}
