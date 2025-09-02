<?php

use Src\Utils\ControllerUtils;
use Src\Service\PlanAlimento\PlanAlimentoCreatorService;

final readonly class PlanAlimentoPostController
{
    private PlanAlimentoCreatorService $service;

    public function __construct() {
        $this->service = new PlanAlimentoCreatorService();
    }

    public function start(): void {
        $name = ControllerUtils::getPost("name");
        $description = ControllerUtils::getPost("description");
        $tipo = ControllerUtils::getPost("tipo");


        $planAlimento = $this->service->create($name, $description, $tipo);

    }


}
