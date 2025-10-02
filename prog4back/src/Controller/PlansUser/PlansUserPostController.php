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
        $id_user = ControllerUtils::getPost("id_user");
        $id_plan = ControllerUtils::getPost("id_plan");

        $plansUser = $this->service->create($id_user, $id_plan);

        echo json_encode([
            "success" => true,
            "message" => "Plan asignado correctamente",
            "data" => [
                "id_user" => $id_user,
                "id_plan" => $id_plan,
                "status" => "Pendiente",
                "expiration_date" => null
            ]
        ]);
    }
}
