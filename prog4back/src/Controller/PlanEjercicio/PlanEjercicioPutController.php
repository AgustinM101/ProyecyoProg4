<?php

use Src\Service\PlanEjercicio\PlanEjercicioUpdaterService;
use Src\Utils\ControllerUtils;

final readonly class PlanEjercicioPutController
{
    private PlanEjercicioUpdaterService $service;

    public function __construct() {
        $this->service = new PlanEjercicioUpdaterService;
    }

    public function start(int $id): void {
        $name = ControllerUtils::getPost("name");
        $code = ControllerUtils::getPost("code");
        $duration_valor = ControllerUtils::getPost("duration_valor");
        $duration_unidad = ControllerUtils::getPost("duration_unidad");
        $tipo = ControllerUtils::getPost("tipo");
        $description = ControllerUtils::getPost("description");

        $planEjercicio = $this->service->update($name, $code, $duration_valor, $duration_unidad, $tipo, $description, $id);
    }

