<?php 

include_once "Route.php";
include_once "Router.php";

function startRouter(): Router 
{
    // Inicializamos el array de rutas
    $routes = [];
    
  
    include_once "Routes/ClientRoutes.php";
   
    $routes = array_merge($routes, ClientRoutes::getRoutes());

    
    include_once "Routes/BrandRoutes.php";
    $routes = array_merge($routes, BrandRoutes::getRoutes());

    include_once "Routes/ArticleRoutes.php";
    $routes = array_merge($routes, ArticleRoutes::getRoutes());

    include_once "Routes/CategoryRoutes.php";
    $routes = array_merge($routes, CategoryRoutes::getRoutes());

    include_once "Routes/UserRoutes.php";
    $routes = array_merge($routes, UserRoutes::getRoutes());
    
    // Como las rutas en este momento son primitivas, tenemos que encapsularlas en un DTO
    $routesClass = [];
    foreach ($routes as $route) {
        // Pasamos de las rutas de tipo array a tipo DTO
        $routesClass[] = Route::fromArray($route);
    }
    
    // Retornamos un nuevo ruteador
    return new Router($routesClass);
}
