<?php

namespace Src\Controller\PlansUser;

use Src\Service\PlansUser\PlansUserRemoverService;

final readonly class PlansUserRemoveController {

    private PlansUserRemoverService $service;

    public function __construct() {
        $this->service = new PlansUserRemoverService();
    }

    public function start(array $body): void {
        $id_user = $body['id_user'];
        $id_plan = $body['id_plan'];

        $this->service->remove($id_plan, $id_plan);

        echo json_encode(["message" => "Plan removido"]);
    }
}
