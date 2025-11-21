<?php

use Src\Controller;
use Src\Infrastructure\Repository\PlansUser\PlansUserRepository;
use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\MercadoPagoConfig;

final class PaymentIpnController
{
    private PlansUserRepository $plansUserRepository;

    public function __construct()
    {
        $this->plansUserRepository = new PlansUserRepository();
        header('Content-Type: application/json');

        MercadoPagoConfig::setAccessToken($_ENV['MP_ACCESS_TOKEN']);
    }

    public function start(): void
    {
        try {
            // 🔹 IPN trabaja por GET, NO por JSON
            $topic = $_GET['topic'] ?? null;
            $paymentId = $_GET['id'] ?? null;

            // Log básico
            file_put_contents(
                __DIR__ . "/ipn_log.txt",
                "======= NUEVA NOTIFICACIÓN =======\n" .
                date("Y-m-d H:i:s") . "\n" .
                "GET:\n" . json_encode($_GET, JSON_PRETTY_PRINT) . "\n" .
                "POST:\n" . json_encode($_POST, JSON_PRETTY_PRINT) . "\n" .
                "RAW BODY:\n" . file_get_contents("php://input") . "\n" .
                "==================================\n\n",
                FILE_APPEND
            );

            if ($topic !== 'payment' || !$paymentId) {
                http_response_code(400);
                echo json_encode([
                    'status' => 'error',
                    'msg' => 'Notificación inválida (topic o id incorrectos)'
                ]);
                return;
            }

            // 🔹 Obtener el pago real desde Mercado Pago
            $client = new PaymentClient();
            $payment = $client->get($paymentId);

            file_put_contents(
                __DIR__ . "/ipn_log.txt",
                "======= INFORMACIÓN DEL PAGO =======\n" .
                date("Y-m-d H:i:s") . "\n" .
                json_encode($payment, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) .
                "\n==================================\n\n",
                FILE_APPEND
            );

            $reference = json_decode($payment->external_reference, true);
            $id_user = $reference["id_user"] ?? null;
            $id_plan = $reference["id_plan"] ?? null;

            if (!$id_user || !$id_plan) {
                http_response_code(400);
                echo json_encode([
                    'status' => 'error',
                    'msg' => 'Falta id_user o id_plan en metadata'
                ]);
                return;
            }

            // 🔹 Estado en tu sistema
            $newStatus = match ($payment->status) {
                'approved' => 'chargePending',  // Confirmá si existe en tu DB
                'pending' => 'pending',
                'rejected', 'cancelled' => 'cancelled',
                default => 'pending'
            };

            // 🔹 Actualizar la tabla plans_user
            $this->plansUserRepository->updateByUserAndPlan(
                $id_user,
                $id_plan,
                [
                    'status' => $newStatus,
                    'expiration_date' => $payment->date_approved ? (new DateTime($payment->date_approved))->format('Y-m-d H:i:s') : null
                ]
            );

            file_put_contents(
                __DIR__ . "/ipn_log.txt",
                date("Y-m-d H:i:s") . " - Estado actualizado: user=$id_user plan=$id_plan status=$newStatus\n",
                FILE_APPEND
            );

            echo json_encode([
                'status' => 'success',
                'message' => 'Estado actualizado correctamente'
            ]);

        } catch (\Throwable $e) {
            file_put_contents(
                __DIR__ . "/ipn_log.txt",
                date("Y-m-d H:i:s") . " ERROR: " . $e->getMessage() . "\n",
                FILE_APPEND
            );

            http_response_code(500);
            echo json_encode([
                'status' => 'error',
                'msg' => $e->getMessage()
            ]);
        }
    }
}


        
    







