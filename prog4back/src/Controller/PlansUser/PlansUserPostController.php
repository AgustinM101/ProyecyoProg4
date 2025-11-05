<?php

use Src\Utils\ControllerUtils;
use Src\Service\PlansUser\PlansUserCreatorService;

final readonly class PlansUserPostController
{
    private PlansUserCreatorService $service;

    public function __construct() {
        $this->service = new PlansUserCreatorService();
    }

    public function start(): void {
        // 🔹 Leer datos del POST normal o del JSON body
        $rawInput = json_decode(file_get_contents('php://input'), true);

        $id_user = $_POST['id_user'] ?? $rawInput['id_user'] ?? null;
        $id_plan = $_POST['id_plan'] ?? $rawInput['id_plan'] ?? $_POST['plan'] ?? $rawInput['plan'] ?? null;

        if ($id_user === null || $id_plan === null) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "id_user o id_plan no enviados"
            ]);
            return;
        }

        // 🔹 Leer método de pago del POST o JSON
        $paymentMethod = $_POST['paymentMethod'] ?? $rawInput['paymentMethod'] ?? null;
        $paymentMethodNormalized = strtolower($paymentMethod ?? '');

        // 🔹 Determinar el estado según método de pago
        $status = ($paymentMethodNormalized === "transferencia" || $paymentMethodNormalized === "efectivo")
            ? "Payment Request"
            : "Pendiente";

        error_log("Método de pago recibido: " . $paymentMethodNormalized);

        // 🔹 Inicializar variables para evitar warnings
        $plansUser = null;
        $expiration_date = null;

        // 🔹 Calcular fecha de expiración solo si el status requiere activación automática
        if ($status === "Activo") {
            $expiration_date = date('Y-m-d H:i:s', strtotime('+30 days'));
        }

        try {
            // 🔹 Crear el plan
            $plansUser = $this->service->create($id_user, $id_plan, $status, $expiration_date);

            echo json_encode([
                "success" => true,
                "message" => "Plan asignado correctamente",
                "data" => [
                    "id" => $plansUser->id(),
                    "id_user" => $id_user,
                    "id_plan" => $id_plan,
                    "status" => $status,
                    "expiration_date" => $plansUser->expiration_date()
                ]
            ]);
        } catch (\Throwable $e) {
            http_response_code(500);
            error_log("Error al crear plan_user: " . $e->getMessage());
            echo json_encode([
                "success" => false,
                "message" => "Error al crear el plan",
                "error" => $e->getMessage()
            ]);
        }
    }
}

