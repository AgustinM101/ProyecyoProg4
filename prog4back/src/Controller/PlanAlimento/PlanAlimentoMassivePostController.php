<?php

use Src\Service\PlanAlimento\PlanAlimentoMassiveCreatorService;
use Src\Utils\ControllerUtils;

final class PlanAlimentoMassivePostController
{
    private PlanAlimentoMassiveCreatorService $service;

    public function __construct() {
        $this->service = new PlanAlimentoMassiveCreatorService();
    }

    public function start(): void
    {
        $plansUserId = ControllerUtils::getPost("id_plans_user");
        $items = ControllerUtils::getPost("items"); // array de items

        if (!$plansUserId || !is_array($items)) {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Solicitud inválida"]);
            return;
        }

        $this->service->createAll($plansUserId, $items);

        echo json_encode(["success" => true, "message" => "Plan alimento creado correctamente"]);
    }
}
