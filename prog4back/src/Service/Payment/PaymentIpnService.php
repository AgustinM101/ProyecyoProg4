<?php

namespace Src\Service\Payment;

use Src\Infrastructure\Repository\Purchase\PurchaseRepository;

final readonly class PaymentIpnService {
    private PurchaseRepository $repo;

    public function __construct() {
        $this->repo = new PurchaseRepository();
    }

    public function processNotification(array $data): void {
        /**
         * Mercado Pago puede enviar las notificaciones IPN de dos formas:
         * 1️⃣ Como JSON (POST body)
         * 2️⃣ Como query params (GET): ?topic=payment&id=123456
         *
         * Este código maneja ambos casos correctamente.
         */

        // Si el body viene vacío, tomamos los datos desde $_GET (MP suele hacerlo así)
        if (empty($data) && !empty($_GET)) {
            $data = $_GET;
        }

        // Validamos que tengamos al menos el id
        if (!isset($data['id'])) {
            throw new \Exception("No se recibió el 'id' de la notificación de Mercado Pago");
        }

        // Validamos el tipo de notificación (topic)
        $topic = $data['topic'] ?? 'unknown';
        if ($topic !== 'payment') {
            throw new \Exception("Tipo de notificación no soportado: $topic");
        }

        $paymentId = $data['id'];

        /**
         * 🔗 NUEVO BLOQUE: Consultar el pago directamente desde la API de Mercado Pago
         */
        $accessToken = $_ENV['MERCADOPAGO_ACCESS_TOKEN'] ?? 'TU_ACCESS_TOKEN_AQUI';

        $url = "https://api.mercadopago.com/v1/payments/{$paymentId}";
        $headers = [
            "Authorization: Bearer $accessToken",
            "Content-Type: application/json",
        ];

        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_RETURNTRANSFER => true,
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode !== 200) {
            throw new \Exception("Error al consultar el pago en Mercado Pago (HTTP $httpCode): $response");
        }

        $paymentData = json_decode($response, true);

        if (!$paymentData || !isset($paymentData['status'])) {
            throw new \Exception("No se pudo obtener el estado del pago desde la respuesta de Mercado Pago");
        }

        $status = $paymentData['status']; // approved, pending, rejected, etc.
        $externalReference = $paymentData['external_reference'] ?? null;

        /**
         * 🧩 Guardamos en la base de datos
         *  - Si tenés un campo 'preference_id' o 'external_reference' lo podés usar como referencia
         */
        $this->repo->updateStatus($externalReference ?? $paymentId, $status);

        // 🧠 Si el pago fue aprobado, actualizamos el plan del usuario
if ($status === 'approved' && $externalReference) {
    try {
        // Conectamos a la base de datos
        $pdo = new \PDO(
            "mysql:host=" . $_ENV['DB_HOST'] . ";dbname=" . $_ENV['DB_NAME'],
            $_ENV['DB_USER'],
            $_ENV['DB_PASS'],
            [\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION]
        );

        // Actualizamos el estado y fecha de expiración (por ejemplo, 30 días desde hoy)
        $stmt = $pdo->prepare("
            UPDATE plans_user 
            SET status = 'Activo', expiration_date = DATE_ADD(NOW(), INTERVAL 30 DAY)
            WHERE id = :external_ref
        ");
        $stmt->execute(['external_ref' => $externalReference]);

        file_put_contents(__DIR__ . '/ipn_debug.log', date('Y-m-d H:i:s') . " ✅ Plan activado para reference: {$externalReference}\n", FILE_APPEND);
    } catch (\Exception $e) {
        file_put_contents(__DIR__ . '/ipn_debug.log', date('Y-m-d H:i:s') . " ❌ Error al actualizar plan: " . $e->getMessage() . "\n", FILE_APPEND);
    }
}


        /**
         * 🪵 Log opcional para depurar
         */
        file_put_contents(__DIR__ . '/ipn_debug.log', date('Y-m-d H:i:s') . " Pago consultado:\n" . print_r([
            'payment_id' => $paymentId,
            'status' => $status,
            'external_reference' => $externalReference,
            'raw_response' => $paymentData,
        ], true) . "\n\n", FILE_APPEND);
    }
}


