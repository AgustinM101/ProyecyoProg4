<?php

use Src\Service\PlanAlimento\PlanAlimentoFinderService;

final readonly class PlanAlimentosGetByUserPlanIdController {

    private PlanAlimentoFinderService $service;

    public function __construct() {
        $this->service = new PlanAlimentoFinderService();
    }

    public function start(int $plansUserId): void
    {
        $planAlimentos = $this->service->findByPlansUserId($plansUserId);

        $response = [];
        foreach($planAlimentos as $pa) {
            $response[] = [
                "id" => $pa->id(),
                "description" => $pa->description(),
                "tipo" => $pa->tipo(),
                "dias" => $pa->dias(),
                "id_plans_user" => $pa->idPlansUser()
            ];
        }

        echo json_encode($response);
    }
}
