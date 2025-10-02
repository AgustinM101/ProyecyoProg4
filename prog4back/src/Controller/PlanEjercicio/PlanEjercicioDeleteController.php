<?php

use Src\Service\PlanEjercicio\PlanEjercicioDeleterService;

final readonly class PlanEjercicioDeleteController
{
    private PlanEjercicioDeleterService $service;

    public function __construct() {
        $this->service = new PlanEjercicioDeleterService();
    }

    public function start(): void {
        // Primero intentamos leer ID desde JSON body
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id'] ?? $_GET['id'] ?? null; // si no está en JSON, lo buscamos en query string

        if (!$id) {
            echo json_encode([
                "status" => 400,
                "message" => "Missing parameter: id is required."
            ]);
            return;
        }

        $deleted = $this->service->delete((int)$id);

        if (!$deleted) {
            echo json_encode([
                "status" => 404,
                "message" => "PlanEjercicio not found."
            ]);
            return;
        }

        echo json_encode([
            "status" => "ok",
            "message" => "PlanEjercicio deleted successfully."
        ]);
    }
}
