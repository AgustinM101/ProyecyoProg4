<?php

use Src\Service\Payment\PaymentService;
use Src\Utils\ControllerUtils;

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

        // 🔹 1️⃣ Leer datos directamente del body JSON
        $rawInput = json_decode(file_get_contents('php://input'), true);

        $plansUserId = !empty($rawInput['plans_user_id']) ? (int)$rawInput['plans_user_id'] : null;
        $title = $rawInput['title'] ?? null;
        $amount = isset($rawInput['amount']) ? (float)$rawInput['amount'] : null;
        $id_user = isset($rawInput['id_user']) ? (int)$rawInput['id_user'] : null;
        $id_plan = isset($rawInput['id_plan']) ? (int)$rawInput['id_plan'] : null;

        // 🔹 2️⃣ Validación de parámetros
        if (!$plansUserId || !$id_user || !$id_plan) {
            http_response_code(400);
            echo json_encode([
                "status" => "error",
                "message" => "Faltan parámetros: plans_user_id, id_user o id_plan"
            ]);
            return;
        }

        try {
            // ✅ Crear preferencia en Mercado Pago
            $preference = $this->service->createPreference(
                $plansUserId,
                $title,
                $amount,
                $id_user,
                $id_plan
            );

            // 🪵 Log opcional para depuración
            file_put_contents(__DIR__ . '/payment_debug.log', date('Y-m-d H:i:s') . " Preferencia creada:\n" . print_r([
                'plans_user_id' => $plansUserId,
                'id_user' => $id_user,
                'id_plan' => $id_plan,
                'title' => $title,
                'amount' => $amount,
                'preference' => $preference
            ], true) . "\n\n", FILE_APPEND);

            // 🔙 Devolvemos el init_point al frontend
            echo json_encode([
                "status" => "success",
                "message" => "Preferencia creada correctamente",
                "preference" => $preference
            ]);
        } catch (\Exception $e) {
            http_response_code(500);

            // 🧠 Log del error para depurar si falla Mercado Pago
            file_put_contents(__DIR__ . '/payment_debug.log', date('Y-m-d H:i:s') . " ERROR:\n" . $e->getMessage() . "\n\n", FILE_APPEND);

            echo json_encode([
                "status" => "error",
                "message" => $e->getMessage()
            ]);
        }
    }
}

