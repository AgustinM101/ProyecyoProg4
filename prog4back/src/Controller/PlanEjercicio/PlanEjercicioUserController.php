<?php

use Src\Service\PlanEjercicio\PlanEjercicioUserFinderService;

final readonly class PlanEjercicioUserController
{
    private PlanEjercicioUserFinderService $service;

    public function __construct() {
        $this->service = new PlanEjercicioUserFinderService();
    }

    public function start(): void {
        $userId = $_GET['plans_user_id'] ?? null;

        if (!$userId) {
            http_response_code(400);
            echo json_encode([
                "status" => 400,
                "message" => "Missing parameter: plans_user_id is required."
            ]);
            return;
        }

        $plan = $this->service->findByPlanUser((int)$userId);

        if (!$plan) {
            http_response_code(404);
            echo json_encode([
                "status" => 404,
                "message" => "No planEjercicio found for this user."
            ]);
            return;
        }

        echo json_encode([
            "status" => "ok",
            "data" => $plan
        ]);
    }
}
