<?php 

// DTO para contener los objetos de la ruta

final readonly class Route
{
    public function __construct(
        private string $name,
        private string $url,
        private string $controller,
        private string $method,
        private array $parameters,
    ) {}
    
    /**
     * Metodo que nos permite crear una ruta a partir de un array
     */
    public static function fromArray(array $data): self
    {
        return new self(
            $data["name"] ?? '',
            $data["url"] ?? '',
            $data["controller"] ?? '',
            $data["method"] ?? '',
            $data["parameters"] ?? [],
        );
    }

    public function name(): string
    {
        return $this->name;
    }

    public function url(): string
    {
        return $this->url;
    }

    public function controller(): string
    {
        return $this->controller;
    }

    /**
     * Metodo que nos permite, a partir de la ruta de un controlador, obtener el nombre de su clase
     * Example: src/Domain/PruebaController.php -> PruebaController
     */
    public function className(): string
    {
        // Dividimos el nombre completo de la ruta del controllador en un array
        // Example: src/Domain/PruebaController.php -> ['src', 'Domain', 'PruebaController.php']
        $route = explode("/", $this->controller);
        // Tomamos la ultima posicion del array y devolvemos su nombre removiendo el .php
        // Example: ['src', 'Domain', 'PruebaController.php'] -> 'PruebaController.php' -> '.php'
        return str_replace('.php', '', end($route));
    }

    public function method(): string
    {
        return $this->method;
    }

    public function parameters(): array
    {
        return $this->parameters;
    }
}