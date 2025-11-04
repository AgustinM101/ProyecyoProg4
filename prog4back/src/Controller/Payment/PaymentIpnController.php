<?php

use Src\Service\Payment\PaymentIpnService;
use Src\Utils\ControllerUtils;

// ✅ Cargamos el autoload y el .env por si este archivo se ejecuta directamente desde Mercado Pago (sin pasar por index.php)
require_once __DIR__ . '/../../../vendor/autoload.php';

if (!isset($_ENV['MP_ACCESS_TOKEN'])) {
    $dotenvPath = __DIR__ . '/../../../';
    if (file_exists($dotenvPath . '.env')) {
        $dotenv = Dotenv\Dotenv::createImmutable($dotenvPath);
        $dotenv->load();
    }
}

final readonly class PaymentIpnController {
    private PaymentIpnService $service;

    public function __construct() {
        $this->service = new PaymentIpnService();
    }

    public function start(): void {
        header('Content-Type: application/json');

        // --- Nuevo método compatible con body raw o JSON ---
        $rawBody = file_get_contents('php://input');
        $data = [];
        parse_str($rawBody, $data); // Si viene form-urlencoded
        $json = json_decode($rawBody, true);
        if (is_array($json)) {
            $data = array_merge($data, $json);
        }

        // Extraemos valores
        $topic = $data['topic'] ?? null;
        $id = $data['id'] ?? null;

        // 🔍 Log de depuración
        file_put_contents(__DIR__ . '/ipn_debug.log', date('Y-m-d H:i:s') . " IPN Recibido:\n" . print_r([
            'rawBody' => $rawBody,
            'data' => $data,
            'topic' => $topic,
            'id' => $id,
        ], true) . "\n\n", FILE_APPEND);

        if (!$topic || !$id) {
            http_response_code(400);
            echo json_encode([
                "status" => "error",
                "message" => "Faltan parámetros: topic o id",
                "debug" => [
                    "topic" => $topic,
                    "id" => $id,
                    "rawBody" => $rawBody
                ]
            ]);
            exit;
        }

        try {
            // ✅ Procesar la notificación con el token ya cargado desde .env
            $this->service->processNotification([
                'topic' => $topic,
                'id' => $id
            ]);

            http_response_code(200);
            echo json_encode(["status" => "success"]);
            exit;
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => $e->getMessage()
            ]);
            exit;
        }
    }
}

