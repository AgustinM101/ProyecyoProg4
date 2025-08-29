<?php 

include_once "Route.php";
include_once "Router.php";

function startRouter(): Router 
{
    $routes = [];

    

    include_once "Routes/ItemsOrder.php";
    $routes = array_merge($routes, ItemsOrderRoutes::getRoutes());

    include_once "Routes/OrderList.php";
    $routes = array_merge($routes, OrderList::getRoutes());

    include_once "Routes/PlanAlimentoRoutes.php";
    $routes = array_merge($routes, PlanAlimentoRoutes::getRoutes());

    include_once "Routes/PlanEjercicioRoutes.php";
    $routes = array_merge($routes, PlanEjercicioRoutes::getRoutes());

    include_once "Routes/PlanRoutes.php";
    $routes = array_merge($routes, PlanRoutes::getRoutes());

    include_once "Routes/UserRoutes.php";
    $routes = array_merge($routes, UserRoutes::getRoutes());

    include_once "Routes/FileRoutes.php";
    $routes = array_merge($routes, FileRoutes::getRoutes());

    $routesClass = [];
    foreach ($routes as $route) {
        $routesClass[] = Route::fromArray($route);
    }

    return new Router($routesClass);
}