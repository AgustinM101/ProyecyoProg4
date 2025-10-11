<?php

use Src\Utils\ControllerUtils;
use Src\Service\PlanEjercicio\PlanEjercicioCreatorService;

final readonly class PlanEjercicioPostController
{
    private PlanEjercicioCreatorService $service;

    public function __construct() {
        $this->service = new PlanEjercicioCreatorService();
    }

    public function start(): void {
        // Leer JSON raw
        $input = json_decode(file_get_contents('php://input'), true);

        if (is_array($input)) {
            $name = $input['name'] ?? null;
            $description = $input['description'] ?? null; // corregido
            $tipo = $input['tipo'] ?? null;               // corregido
        } else {
            // Form-data
            $name = ControllerUtils::getPost("name");
            $description = ControllerUtils::getPost("description"); // corregido
            $tipo = ControllerUtils::getPost("tipo");               // corregido
        }

        // Validar parámetros obligatorios
        if (!$name || !$tipo || !$description) {
            echo json_encode([
                "status" => 400,
                "message" => "Missing parameters: name, tipo, and description are required."
            ]);
            return;
        }

        // Crear el plan
        $planEjercicio = $this->service->create($name, $description, $tipo);

        // Devolver objeto serializado
        echo json_encode([
            "status" => "ok",
            "data" => $planEjercicio->toArray()
        ]);
    }
}
