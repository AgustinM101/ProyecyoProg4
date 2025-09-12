<?php

use Src\Utils\ControllerUtils;
use Src\Service\PlanAlimento\PlanAlimentoCreatorService;

final readonly class PlanAlimentoPostController
{
    private PlanAlimentoCreatorService $service;

    public function __construct() {
        $this->service = new PlanAlimentoCreatorService();
    }

    //va id-plan?
    public function start(): void {
        $id_plan = ControllerUtils::getPost("id_plan");
        $name= ControllerUtils::getPost("name");
        $descripcion = ControllerUtils::getPost("descripcion");
        $tipo = ControllerUtils::getPost("tipo");

        $planAlimento = $this->service->create($id_plan, $name, $descripcion, $tipo);

    }


}
