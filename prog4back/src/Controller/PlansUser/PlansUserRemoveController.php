<?php

use Src\Service\PlansUser\PlansUserRemoverService;

final readonly class PlansUserRemoveController {

    private PlansUserRemoverService $service;

    public function __construct() {
        $this->service = new PlansUserRemoverService();
    }

    // id viene por la URL
    public function start(int $id): void {
        // Llamamos directamente al método que elimina por id
        $this->service->removePlanById($id);

        echo json_encode(["message" => "Plan removido"]);
    }
}

