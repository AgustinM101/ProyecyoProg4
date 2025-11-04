<?php

use Src\Utils\ControllerUtils;
use Src\Service\PlansUser\PlansUserCreatorService;

final readonly class PlansUserPostController
{
    private PlansUserCreatorService $service;

    public function __construct() {
        $this->service = new PlansUserCreatorService();
    }

    public function start(): void {
        // 🔹 Leer datos del POST normal o del JSON body
        $rawInput = json_decode(file_get_contents('php://input'), true);

        $id_user = $_POST['id_user'] ?? $rawInput['id_user'] ?? null;

        // 🔹 Aceptar tanto "id_plan" como "plan" desde el frontend
        $id_plan = $_POST['id_plan'] ?? $rawInput['id_plan'] ?? $_POST['plan'] ?? $rawInput['plan'] ?? null;

        if ($id_user === null || $id_plan === null) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "id_user o id_plan no enviados"
            ]);
            return;
        }

        $plansUser = $this->service->create($id_user, $id_plan);

        echo json_encode([
            "success" => true,
            "message" => "Plan asignado correctamente",
            "data" => [
                "id" => $plansUser->id(), // 🔹 ID del plan_user recién creado
                "id_user" => $id_user,
                "id_plan" => $id_plan,
                "status" => "Pendiente",
                "expiration_date" => null
            ]
        ]);
    }
}
