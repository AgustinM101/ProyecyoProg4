<?php
// controllers/Payment/PaymentController.php
require_once __DIR__ . '/../../service/PaymentService.php';
require_once __DIR__ . '/../../repositories/PurchaseRepository.php';
require_once __DIR__ . '/../../config/Database.php';

final class PaymentController {
    private PaymentService $paymentService;

    public function __construct() {
        $db = new Database();
        $conn = $db->getConnection();

        $purchaseRepository = new PurchaseRepository($conn);
        $this->paymentService = new PaymentService($purchaseRepository);
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
