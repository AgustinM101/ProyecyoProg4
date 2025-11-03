<?php

use Src\Service\PlanEjercicio\PlanEjercicioFinderService;

final readonly class PlanEjerciciosGetByUserPlanIdController {

    private PlanEjercicioFinderService $service;

    public function __construct() {
        $this->service = new PlanEjercicioFinderService();
    }

    public function start(int $plansUserId): void
    {
        $planEjercicios = $this->service->findByPlansUserId($plansUserId);

        $response = [];
        foreach($planEjercicios as $pe) {
            $response[] = [
                "id" => $pe->id(),
                "description" => $pe->description(),
                "tipo" => $pe->tipo(),
                "dias" => $pe->dias(),
                "id_plans_user" => $pe->idPlansUser()
            ];
        }

        echo json_encode($response);
    }
}
