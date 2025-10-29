<?php

use Src\Service\PlanAlimento\PlanAlimentoUserService;


final class PlanAlimentoUpdateByUserPlanController {

    private PlanAlimentoUserService $service;

    public function __construct() {
        $this->service = new PlanAlimentoUserService();
    }

    public function start(int $id): void
    {
        $body = json_decode(file_get_contents("php://input"), true);

        $description = $body["description"] ?? null;
        $tipo        = $body["tipo"] ?? null;
        $dias        = $body["dias"] ?? null;

        if (!$description || !$tipo || !$dias) {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Campos incompletos"]);
            return;
        }

        $this->service->updateForUser($id, $description, $tipo, $dias);

        echo json_encode(["success" => true, "message" => "Alimento actualizado"]);
    }
}
