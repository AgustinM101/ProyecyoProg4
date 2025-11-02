<?php

namespace Src\Service\Payment;

use MercadoPago\MercadoPagoConfig;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\Exceptions\MPApiException;


class PaymentService

>>>>>>> 6cdabf8 (Resueltos conflictos y agregados archivos nuevos de PaymentIpn)
{
    public function createPreference(
        ?int $id,
        string $title,
        float $price,
        int $id_user,
        int $id_plan
    ): array {
        try {
            // 🔐 Cargamos Access Token desde .env
            MercadoPagoConfig::setAccessToken($_ENV['MP_ACCESS_TOKEN']);

            $client = new PreferenceClient();

            // 🌐 URL base (usa Ngrok o la que tengas configurada)
            $ngrokUrl = $_ENV['APP_URL'] ?? "https://craziest-trepidly-monnie.ngrok-free.dev";

            // 🔹 URL del frontend (donde querés que se redirija al finalizar)
            $frontendUrl = $_ENV['FRONT_URL'] ?? null;
            if (!$frontendUrl) {
                throw new \Exception("La variable de entorno FRONT_URL no está configurada.");
            }


            // 🧾 Crear preferencia con datos y URLs de retorno
            $preference = $client->create([
                "items" => [
                    [
                        "id" => $id ?? 0,
                        "title" => $title,
                        "quantity" => 1,
                        "unit_price" => $price,
                        "currency_id" => "ARS",
                    ],
                ],

                // 🔹 Ahora las URLs de retorno apuntan al frontend
                "back_urls" => [
                    "success" => "$frontendUrl/plansform",
                    "failure" => "$frontendUrl/purchase?status=failure",
                    "pending" => "$frontendUrl/purchase?status=pending"
                ],


                "notification_url" => "$ngrokUrl/payment_ipn",
                "auto_return" => "approved",
                "metadata" => [
                    "id_user" => $id_user,
                    "id_plan" => $id_plan,
                ],
                "external_reference" => "{$id_user}_{$id_plan}",

            ]);

            // ✅ Retornar en formato compatible con el frontend
            return [
                "data" => [
                    "preference" => [
                        "id" => $preference->id,
                        "init_point" => $preference->init_point,
                        "sandbox_init_point" => $preference->sandbox_init_point,
                    ],
                ],
            ];
        } catch (MPApiException $e) {
            throw new \Exception("Error al crear la preferencia: " . $e->getMessage());
        } catch (\Throwable $e) {
            throw new \Exception("Error inesperado al crear la preferencia: " . $e->getMessage());
        }
    }
}
