<?php

use Src\Utils\ControllerUtils;
use Src\Service\PlanAlimento\PlanAlimentoCreatorService;

final readonly class PlanAlimentoPostController
{
    private PlanAlimentoCreatorService $service;

    public function __construct() {
        $this->service = new PlanAlimentoCreatorService();
    }

    public function start(): void {
        // Intentar leer JSON raw
        $input = json_decode(file_get_contents('php://input'), true);

        if (is_array($input)) {
            $name = $input['name'] ?? null;
            $description = $input['description'] ?? null;
            $tipo = $input['tipo'] ?? null;
            
        } else {
            // Si no hay JSON, usar form-data / x-www-form-urlencoded
            $name = ControllerUtils::getPost("name");
            $description = ControllerUtils::getPost("description");
            $tipo = ControllerUtils::getPost("tipo");
        }

        // Validar parámetros obligatorios
        if (!$name || !$description || !$tipo) {
            echo json_encode([
                "status" => 400,
                "message" => "Missing parame: name, description, and tipo are required."
            ]);
            return;
        }

        // Crear el plan
        $planAlimento = $this->service->create($name, $description, $tipo);

        echo json_encode([
            "status" => "ok",
            "data" => $planAlimento
        ]);
    }
}
