<?php

use Src\Service\PlanAlimento\PlanAlimentoUserFinderService;

final readonly class PlanAlimentoUserController
{
    private PlanAlimentoUserFinderService $service;

    public function __construct() {
        $this->service = new PlanAlimentoUserFinderService();
    }

    public function start(): void {
        $userId = $_GET['plans_user_id'] ?? null;

        if (!$userId) {
            echo json_encode([
                "status" => 400,
                "message" => "Missing parameter: plans_user_id is required."
            ]);
            return;
        }

        $plan = $this->service->findByPlanUser((int)$userId);

        if (!$plan) {
            echo json_encode([
                "status" => 404,
                "message" => "No planAlimento found for this user."
            ]);
            return;
        }

        echo json_encode([
            "status" => "ok",
            "data" => $plan
        ]);
    }
}

