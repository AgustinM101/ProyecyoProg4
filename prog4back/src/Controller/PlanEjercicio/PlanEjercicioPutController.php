<?php

use Src\Service\PlanEjercicio\PlanEjercicioUpdaterService;

final readonly class PlanEjercicioPutController
{
    private PlanEjercicioUpdaterService $service;

    public function __construct() {
        $this->service = new PlanEjercicioUpdaterService();
    }

    public function start(): void {
        // Leer JSON body
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id'] ?? null;
        $name = $input['name'] ?? null;
        $description = $input['description'] ?? null;
        $tipo = $input['tipo'] ?? null;

        if (!$id || !$name || !$description || !$tipo) {
            echo json_encode([
                "status" => 400,
                "message" => "Missing parameters: id, name, description, and tipo are required."
            ]);
            return;
        }

        $updatedPlan = $this->service->update((int)$id, $name, $description, $tipo);

        if ($updatedPlan === null) {
            echo json_encode([
                "status" => 404,
                "message" => "PlanEjercicio not found."
            ]);
            return;
        }

        echo json_encode([
            "status" => "ok",
            "data" => $updatedPlan->toArray()
        ]);
    }
}

