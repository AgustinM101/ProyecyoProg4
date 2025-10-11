<?php

use Src\Service\PlansForm\PlansFormDeleterService;

final readonly class PlansFormDeleteController
{
    private PlansFormDeleterService $service;


    public function __construct() {
        $this->service = new PlansFormDeleterService;
    }

    public function start(int $id): void {

        $this->service->delete($id);

    }

        
    }



