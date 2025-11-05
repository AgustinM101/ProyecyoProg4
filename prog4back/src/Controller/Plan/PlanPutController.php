<?php

use Src\Service\Plan\PlanUpdaterService;
use Src\Utils\ControllerUtils;

final readonly class PlanPutController
{
    private PlanUpdaterService $service;

    public function __construct() {
        $this->service = new PlanUpdaterService;
    }

    public function start(int $id): void {

        $name = ControllerUtils::getPost("name");
        $description = ControllerUtils::getPost("description");
        $price = ControllerUtils::getPost("price");
        

        $plan = $this->service->update($name, $description, $price, $id);
    }


}