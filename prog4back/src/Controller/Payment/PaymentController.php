<?php

use Src\Utils\ControllerUtils;
use Src\Service\Payment\PaymentService;

final readonly class PaymentController
{
    private PaymentService $service;

    public function __construct()
    {
        $this->service = new PaymentService();
    }

    public function start(): void
    {
        $plansUserIdRaw = ControllerUtils::getPost("plans_user_id");
        $plansUserId = !empty($plansUserIdRaw) ? (int) $plansUserIdRaw : null; // ✅ acepta null

        $title = ControllerUtils::getPost("title");
        $amount = (float) ControllerUtils::getPost("amount");

        try {
            $initPoint = $this->service->createPreference($plansUserId, $title, $amount);

            echo json_encode([
                "status" => "success",
                "url" => $initPoint
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => $e->getMessage()
            ]);
        }
    }
}


