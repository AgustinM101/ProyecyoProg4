<?php

use Src\Service\PlanEjercicio\PlanEjercicioDeleterService;

final readonly class PlanEjercicioDeleteController
{
    private PlanEjercicioDeleterService $service;


    public function __construct() {
        $this->service = new PlanEjercicioDeleterService;
    }

    public function start(int $id): void {

        

        $this->service->delete($id);
    }


}


