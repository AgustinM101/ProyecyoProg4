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
        header('Content-Type: application/json');

        // 🔹 1️⃣ Leer datos del body JSON
        $rawInput = json_decode(file_get_contents('php://input'), true);

        $title = $rawInput['title'] ?? null;
        $amount = isset($rawInput['amount']) ? (float)$rawInput['amount'] : null;
        $id_user = isset($rawInput['id_user']) ? (int)$rawInput['id_user'] : null;
        $id_plan = isset($rawInput['id_plan']) ? (int)$rawInput['id_plan'] : null;

        // 🔹 2️⃣ Validación de parámetros
        if (!$title || !$amount || !$id_user || !$id_plan) {
            http_response_code(400);
            echo json_encode([
                "status" => "error",
                "message" => "Faltan parámetros obligatorios: title, amount, id_user, id_plan"
            ]);
            return;
        }

        try {
            // 🔹 3️⃣ Crear preferencia de pago en Mercado Pago
            $preference = $this->service->createPreference(
                $id_plan,
                $title,
                $amount,
                $id_user
            );

            // 🪵 Log
            file_put_contents(
                __DIR__ . '/payment_debug.log',
                date('Y-m-d H:i:s') . " Preferencia creada:\n" . print_r([
                    'id_user' => $id_user,
                    'id_plan' => $id_plan,
                    'title' => $title,
                    'amount' => $amount,
                    'preference' => $preference
                ], true) . "\n\n",
                FILE_APPEND
            );

            // 🔙 4️⃣ Respuesta al frontend
            echo json_encode([
                "status" => "success",
                "message" => "Preferencia creada correctamente",
                "url" => $preference['url'],     // para abrir Mercado Pago
                "preference_id" => $preference['preference_id']
            ]);

        } catch (\Exception $e) {
            http_response_code(500);

            // 🧠 Log error
            file_put_contents(
                __DIR__ . '/payment_debug.log',
                date('Y-m-d H:i:s') . " ERROR:\n" . $e->getMessage() . "\n\n",
                FILE_APPEND
            );

            echo json_encode([
                "status" => "error",
                "message" => $e->getMessage()
            ]);
        }
    }
}


