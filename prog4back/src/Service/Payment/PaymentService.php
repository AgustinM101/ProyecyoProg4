<?php

namespace Src\Service\Payment;

use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\MercadoPagoConfig;
use MercadoPago\Exceptions\MPApiException;

class PaymentService
{
    public function createPreference(
        int $id_plan,
        string $title,
        float $price,
        int $id_user
    ): array {
        try {

            // Verificar token MP
            if (!isset($_ENV['MP_ACCESS_TOKEN'])) {
                throw new \Exception("MP_ACCESS_TOKEN no está configurado en .env");
            }

            MercadoPagoConfig::setAccessToken($_ENV['MP_ACCESS_TOKEN']);
            $client = new PreferenceClient();

            $backendUrl = rtrim($_ENV['APP_URL'], "/");

            // URL del frontend
            $frontendUrl = $_ENV['FRONT_URL'] ?? null;
            if (!$frontendUrl) {
                throw new \Exception("FRONT_URL no está configurado en .env");
            }
            $frontendUrl = rtrim($frontendUrl, "/");

            // Crear preferencia sin back_urls
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
                "notification_url" => "$backendUrl/payment_ipn",
                "metadata" => [
                    "id_user" => $id_user,
                    "id_plan" => $id_plan,
                ],
                "external_reference" => "{$id_user}_{$id_plan}",
            ]);

            // Crear back_urls con el ID
            $backUrls = [
                "success" => "$frontendUrl/plansForms?preference_id={$preference->id}",
                "failure" => "$frontendUrl/plansForms?status=failure",
                "pending" => "$frontendUrl/plansForms?status=pending"
            ];

            // Actualizar la preferencia
            $client->update($preference->id, [
                "back_urls" => $backUrls
            ]);

            // Log de debug
            file_put_contents(
                __DIR__ . '/mp_debug.log',
                date('Y-m-d H:i:s') .
                "\nPreferencia creada y back_urls actualizadas:\n" .
                print_r($preference, true) . "\n\n",
                FILE_APPEND
            );

            return [
                "url" => [
                    "init_point" => $preference->init_point,
                    "sandbox_init_point" => $preference->sandbox_init_point ?? null,
                ],
                "preference_id" => $preference->id,
            ];

        } catch (MPApiException $e) {

            file_put_contents(
                __DIR__ . '/mp_debug.log',
                date('Y-m-d H:i:s') .
                " ERROR MPApiException:\n" .
                print_r($e->getApiResponse(), true) . "\n\n",
                FILE_APPEND
            );

            throw new \Exception("Error API Mercado Pago: " . $e->getMessage());

        } catch (\Throwable $e) {

            file_put_contents(
                __DIR__ . '/mp_debug.log',
                date('Y-m-d H:i:s') .
                " ERROR inesperado:\n" . $e->getMessage() . "\n\n",
                FILE_APPEND
            );

            throw new \Exception("Error inesperado: " . $e->getMessage());
        }
    }
}
