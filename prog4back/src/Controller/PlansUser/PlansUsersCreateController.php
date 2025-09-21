<?php

namespace Src\Controller\PlansUser;

use Src\Service\PlansUser\PlansUserCreatorService;

final readonly class PlansUserCreateController {

    private PlansUserCreatorService $service;

    public function __construct() {
        $this->service = new PlansUserCreatorService();
    }

    public function start(array $body): void {
        $id_user = $body['id_user'];
        $id_plan = $body['id_plan'];
        $status = $body['status'] ?? 'pendiente';

        $this->service->create($id_user, $id_plan, $status);

        echo json_encode(["message" => "Plan asignado"]);
    }
}
