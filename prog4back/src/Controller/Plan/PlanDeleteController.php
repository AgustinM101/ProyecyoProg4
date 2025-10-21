<?php

use Src\Service\Plan\PlanDeleterService;

final readonly class PlanDeleteController
{
    private PlanDeleterService $service;


    public function __construct() {
        $this->service = new PlanDeleterService;
    }

    public function start(int $id): void {

    

        $this->service->delete( $id);
    }
}


