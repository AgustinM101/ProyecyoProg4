<?php


final class PlanAlimentoCreateByUserPlanController {

    private PlanAlimentoUserService $service;

    public function __construct() {
        $this->service = new PlanAlimentoUserService();
    }

    public function start(): void
    {
        $body = json_decode(file_get_contents("php://input"), true);

        $description = $body["description"] ?? null;
        $tipo        = $body["tipo"] ?? null;
        $dias        = $body["dias"] ?? null;
        $idPlansUser = $body["id_plans_user"] ?? null;

        if (!$description || !$tipo || !$dias || !$idPlansUser) {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Campos incompletos"]);
            return;
        }

        $this->service->createForUser($description, $tipo, $dias, $idPlansUser);

        echo json_encode(["success" => true, "message" => "Alimento agregado al plan"]);
    }
}
