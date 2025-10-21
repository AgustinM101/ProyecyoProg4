<?php

use Src\Service\PlansUser\PlansUserUpdaterService;
use Src\Utils\ControllerUtils;

final readonly class PlansUserPutController {

    private PlansUserUpdaterService $service;

    public function __construct() {
        $this->service = new PlansUserUpdaterService();
    }

    public function start(int $id): void {
        $status = ControllerUtils::getPost("status");
        $expiration_date = ControllerUtils::getPost("expiration_date");

        try {
            $this->service->updateStatusAndExpirationById($id, $status, $expiration_date);
            echo json_encode([
                "success" => true,
                "message" => "Plan actualizado correctamente"
            ]);
        } catch (\Exception $e) {
            http_response_code(404);
            echo json_encode([
                "success" => false,
                "error" => $e->getMessage()
            ]);
        }
    }
}
