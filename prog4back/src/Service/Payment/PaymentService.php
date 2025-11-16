<?php

namespace Src\Service;

use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\MercadoPagoConfig;
use MercadoPago\Exceptions\MPApiException;

class PaymentService
{
    /**
     * Crea una preferencia de Mercado Pago
     */
    public function createPreference(
        int $id_plan,
        string $title,
        float $price,
        int $id_user
    ): array {
        try {
            // 1️⃣ Setear Access Token desde .env
            MercadoPagoConfig::setAccessToken($_ENV['MP_ACCESS_TOKEN']);

            // 2️⃣ Crear cliente de preferencias
            $client = new PreferenceClient();

            // 3️⃣ Base URL para webhook (Ngrok)
            $ngrokUrl = $_ENV['APP_URL'] ?? "https://craziest-trepidly-monnie.ngrok-free.dev";

            // 4️⃣ URL del frontend
            $frontendUrl = $_ENV['FRONT_URL'] ?? null;
            if (!$frontendUrl) {
                throw new \Exception("FRONT_URL no está configurado en .env");
            }

            // 5️⃣ Crear preferencia
            $preference = $client->create([
                "items" => [
                    [
                        "id" => $id_plan,
                        "title" => $title,
                        "quantity" => 1,
                        "unit_price" => (float)$price,
                        "currency_id" => "ARS",
                    ],
                ],

                "back_urls" => [
                    "success" => "$frontendUrl/plansform",
                    "failure" => "$frontendUrl/plans/phav?status=failure",
                    "pending" => "$frontendUrl/plans/phav?status=pending",
                ],

                "notification_url" => "$ngrokUrl/payment_ipn",

                "auto_return" => "approved",

                "metadata" => [
                    "id_user" => $id_user,
                    "id_plan" => $id_plan,
                ],

                "external_reference" => "{$id_user}_{$id_plan}",
            ]);

            // 6️⃣ Retornar datos compatibles con frontend
            return [
                "url" => [
                    "init_point" => $preference->init_point,
                    "sandbox_init_point" => $preference->sandbox_init_point ?? null,
                ],
                "preference_id" => $preference->id,
            ];

        } catch (MPApiException $e) {
            throw new \Exception("Error API Mercado Pago: " . $e->getMessage());
        } catch (\Throwable $e) {
            throw new \Exception("Error inesperado: " . $e->getMessage());
        }
    }
}

