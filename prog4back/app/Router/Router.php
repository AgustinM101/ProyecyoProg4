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
     * Función principal que se encarga de la lógica del ruteador.
     * Permite obtener la ruta a partir del URL, el método y los parámetros enviados por el usuario.
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

        // Obtenemos los parámetros
        $parameters = $this->getParameters($route, $url);

        // Instanciamos el controlador
        $controller = new ($route->className())();

        // Llamamos a la función principal del controlador
        $controller->start(...$parameters);
    }

    /**
     * Método que nos permite filtrar una ruta
     */
    private function filterRoute(string $url, string $method): ?Route
    {
        foreach ($this->routes as $route) {
            $parameters = $this->getParameters($route, $url);

            $baseUrl = $this->getBaseUrl($url);

            if (
                $baseUrl === $route->url() &&
                $method === $route->method() &&
                $this->validateParameters($parameters, $route->parameters())
            ) {
                return $route;
            }
        }

        return null;
    }

    /**
     * Método que nos permite obtener los parámetros a partir de la URL seleccionada
     * Ejemplo: domain/1/2 -> [1, 2]
     */
    private function getParameters(Route $route, string $url): array
    {
        $param_str = str_replace($route->url(), '', $url);
        $params = explode('/', trim($param_str, '/'));
        return array_filter($params);
    }

    /**
     * Método que nos permite validar si los parámetros ingresados por el usuario coinciden con la configuración de la ruta
     */
    private function validateParameters(array $urlParameters, array $routeParameters): bool
    {
        // Validamos cantidad de parámetros
        if (sizeof($urlParameters) !== sizeof($routeParameters)) {
            return false;
        }

        $validParams = 0;
        for ($i = 0; $i < sizeof($routeParameters); $i++) {
            $type = $routeParameters[$i]['type'] ?? 'string';

            if ($type === 'int' && (int) $urlParameters[$i] === 0) {
                continue;
            }

            $validParams++;
        }

        return $validParams === sizeof($urlParameters);
    }

    private function getBaseUrl(string $url): string
    {
        $url = substr($url, 1);
        $baseUrl = explode('/', $url);
        return '/' . $baseUrl[0];
    }

}
