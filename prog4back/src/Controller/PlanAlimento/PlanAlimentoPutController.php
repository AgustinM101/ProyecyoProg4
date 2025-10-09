<?php

use Src\Service\PlanAlimento\PlanAlimentoUpdaterService;
use Src\Utils\ControllerUtils;

final readonly class PlanAlimentoPutController
{
    private PlanAlimentoUpdaterService $service;

    public function __construct() {
        $this->service = new PlanAlimentoUpdaterService;
    }

    public function start(int $id): void {
        $name = ControllerUtils::getPost("name");
        $description = ControllerUtils::getPost("description");
        $tipo = ControllerUtils::getPost("tipo");


        $planAlimento = $this->service->update($name, $description, $tipo, $id);
    }


}