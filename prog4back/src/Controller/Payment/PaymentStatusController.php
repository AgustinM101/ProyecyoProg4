<?php

use Src\Controller\Payment;

use Src\Infrastructure\PDO\PDOManager;

final class PaymentStatusController extends PDOManager
{
    public function start(): void
    {
        header('Content-Type: application/json');

        try {
            $preferenceId = $_GET['preference_id'] ?? null;

            if (!$preferenceId) {
                throw new \Exception("Falta el parámetro preference_id");
            }

            // Consultar en la tabla payment
            $sql = "SELECT status FROM payment WHERE preference_id = :preference_id LIMIT 1";
            $stmt = $this->connection->prepare($sql);
            $stmt->execute([':preference_id' => $preferenceId]);
            $payment = $stmt->fetch(\PDO::FETCH_ASSOC);

            if (!$payment) {
                throw new \Exception("No se encontró pago con ese preference_id");
            }

            echo json_encode([
                "status" => $payment['status']
            ]);

        } catch (\Throwable $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => $e->getMessage()
            ]);
        }
    }
}
