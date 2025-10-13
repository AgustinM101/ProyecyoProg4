<?php
// src/Controller/Payment/PaymentController.php
require_once __DIR__ . '/../../Service/PaymentService.php';

final class PaymentController {
    private PaymentService $paymentService;

    public function __construct() {
        $this->paymentService = new PaymentService();
    }

    public function __invoke(): void {
        header('Content-Type: application/json');

        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data) {
            http_response_code(400);
            echo json_encode(['error' => 'Datos inválidos']);
            return;
        }

        try {
            $initPoint = $this->paymentService->createPreference(
                $data['userId'] ?? null,
                $data['nombre'] ?? '',
                $data['email'] ?? '',
                $data['plan'] ?? '',
                $data['amount'] ?? 0
            );

            echo json_encode([
                'status' => 200,
                'url' => $initPoint
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}
