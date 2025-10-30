<?php

use Src\Service\PlanAlimento\PlanAlimentoMassiveUpdaterService;
use Src\Utils\ControllerUtils;

final class PlanAlimentoMassivePutController
{
    private PlanAlimentoMassiveUpdaterService $service;

    public function __construct() {
        $this->service = new PlanAlimentoMassiveUpdaterService();
    }

    // ✅ recibe el plans_user_id desde la URL
    public function start(int $id_plans_user): void
        {
            $items = ControllerUtils::getPost("items");

            if (!$items || !is_array($items)) {
                http_response_code(400);
                echo json_encode(["success" => false, "error" => "Solicitud inválida"]);
                return;
            }

            $this->service->updateAll($id_plans_user, $items);

            echo json_encode(["success" => true, "message" => "Plan alimento actualizado correctamente"]);
        }

}
