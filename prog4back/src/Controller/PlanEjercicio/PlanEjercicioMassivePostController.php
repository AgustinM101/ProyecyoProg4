<?php

use Src\Service\PlanEjercicio\PlanEjercicioMassiveCreatorService;
use Src\Utils\ControllerUtils;

final class PlanEjercicioMassivePostController
{
    private PlanEjercicioMassiveCreatorService $service;

    public function __construct() {
        $this->service = new PlanEjercicioMassiveCreatorService();
    }

    public function start(): void
    {
        $plansUserId = ControllerUtils::getPost("id_plans_user");
        $items = ControllerUtils::getPost("items");

        if (!$plansUserId || !is_array($items)) {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Solicitud inválida"]);
            return;
        }

        $this->service->createAll($plansUserId, $items);

        echo json_encode(["success" => true, "message" => "Plan ejercicio creado correctamente"]);
    }
}
