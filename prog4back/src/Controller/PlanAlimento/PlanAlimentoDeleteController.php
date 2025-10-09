<?php

use Src\Service\PlanAlimento\PlanAlimentoDeleterService;

final readonly class PlanAlimentoDeleteController
{
    private PlanAlimentoDeleterService $service;


    public function __construct() {
        $this->service = new PlanAlimentoDeleterService();
    }

    public function start(int $id): void {

        $this->service->delete($id);

    }

}