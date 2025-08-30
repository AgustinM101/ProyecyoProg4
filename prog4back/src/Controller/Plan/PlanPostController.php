<?php

use Src\Utils\ControllerUtils;
use Src\Service\Plan\PlanCreatorService;

final readonly class PlanPostController
{
    private PlanCreatorService $service;

    public function __construct() {
        $this->service = new PlanCreatorService();
    }

    public function start(): void {
        $name = ControllerUtils::getPost("name");
        $description = ControllerUtils::getPost("description");
        $price = ControllerUtils::getPost("price");


        $plan = $this->service->create($name, $description, $price);

    }


}

