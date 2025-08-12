<?php 

include_once "Route.php";

final readonly class Router
{
    /** @param Route[] $routes */
    public function __construct(
        private readonly array $routes
    ) {
    }

    /**
     * Funcion principal que se encarga de la logica del Ruteador. 
     * Nos permite obtener la ruta a partir del URL, el metodo y los parametros enviados por el usuario.
     */
    public function resolve(string $url, string $method): void
    {
        // Buscamos la ruta
        $route = $this->filterRoute($url, $method);

        // Si no existe, error
        if (empty($route)) {
            throw new Exception('Invalid route');
        }

        // Cargamos el archivo correspondiente al controlador
        require $_SERVER["DOCUMENT_ROOT"].'/src/Controller/'.$route->controller();

        // Obtenemos los parametros
        $parameters = $this->getParameters($route, $url);

        // Instanciamos el controllador
        $controller = new ($route->className())();
        // Llamamos a la funcion principal del controlador
        $controller->start(...$parameters);
    }

    /**
     * Metodo que nos permite filtrar una ruta
     */
    private function filterRoute(string $url, string $method): ?Route
    {
        // Recorremos cada una de las rutas
        foreach ($this->routes as $route) {
            // Obtenemos los parametros actuales
            $parameters = $this->getParameters($route, $url);

            if (
                // Determinamos si la URL a la que ingreso el usuario coincide con alguna de nuestras rutas
                str_contains($url, $route->url()) && 
                // Y si el metodo coincide con el de la ruta
                $method === $route->method() && 
                // Y si los parametros ingresados por el usuario coinciden con los determinados en la ruta
                $this->validateParameters($parameters, $route->parameters())
            ) {
                return $route;
            }
        }      

        // Si no encontramos ninguna ruta, devolvemos NULL
        return null;
    }

    /**
     * Metodo que nos permite obtener los parametros a partir de la URL seleccionada
     * Example: domain/1/2 -> [1, 2]
     */
    private function getParameters(Route $route, string $url): array
    {
        // Quitamos la ruta del url actual
        // Example domain/1/2 => /1/2/
        $param_str = str_replace($route->url(), '', $url);
        // Separamos el string sobrante en un array
        // Example /1/2 => [1,2]
        $params = explode('/', trim($param_str, '/'));
        return array_filter($params);        
    }

    /**
     * Metodo que nos permite validar si los parametros ingresados por el usuario coinciden con la configuracion de la ruta
     */
    private function validateParameters(array $urlParameters, array $routeParameters): bool 
    {
        // Si los parametros ingresados en el URL no coinciden con la cantidad de parametros esperados por la ruta, retornamos false
        if (sizeof($urlParameters) !== sizeof($routeParameters)) {
            return false;
        }

        $validParams = 0;
        // Recorremos cada uno de los parametros enviados por el usuario
        for ($i = 0; $i < sizeof($routeParameters); $i++) {
            $type = $routeParameters[$i]['type'] ?? 'string';

            // Si el tipo de parametro que esperamos es un tipo INT, y el usuario nos envia un string 
            // Example: 'Hola'
            // NO lo declaramos como valido y pasamos hacia el siguiente parametro
            if ($type === 'int' && (int) $urlParameters[$i] === 0) {
                // Con esta linea le decimos a PHP que no siga recorriendo este bucle y se vaya al siguiente
                continue;
            } 

            // En el caso de que todo este OK, el parametro se considera como valido
            $validParams++;
        }

        // Si la cantidad de parametros validos es diferente a la cantidad de parametros esperados por la ruta, retornamos false
        if ($validParams !== sizeof($urlParameters)) {
            return false;
        }

        // Si todo esta OK, return true
        return true;
    }
}