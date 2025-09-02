<?php

use Src\Utils\ControllerUtils;
use Src\Service\PlanEjercicio\PlanEjercicioCreatorService;

final readonly class PlanEjercicioPostController
{
    private PlanEjercicioCreatorService $service;

    public function __construct() {
        $this->service = new PlanEjercicioCreatorService();
    }

    public function start(): void {
        $name = ControllerUtils::getPost("name");
        $code = ControllerUtils::getPost("code");
        $duration_valor = ControllerUtils::getPost("duration_valor");
        $duration_unidad = ControllerUtils::getPost("duration_unidad");
        $tipo = ControllerUtils::getPost("tipo");
        $description = ControllerUtils::getPost("description");

        $planEjercicio = $this->service->create($name, $code, $duration_valor, $duration_unidad, $tipo, $description);

    }


}

