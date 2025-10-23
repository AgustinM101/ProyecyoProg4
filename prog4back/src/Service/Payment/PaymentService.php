<?php

namespace Src\Service\Payment;

use MercadoPago\MercadoPagoConfig;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\Exceptions\MPApiException;

 class PaymentService
{
    public function createPreference($id, $title, $price)
    {
        try {
            // Configuramos el Access Token desde las variables de entorno (.env)
            MercadoPagoConfig::setAccessToken($_ENV['MP_ACCESS_TOKEN']);

            // Creamos un nuevo cliente de preferencias
            $client = new PreferenceClient();

            // Creamos la preferencia (el "pago")
            $preference = $client->create([
                "items" => [
                    [
                        "id" => $id,
                        "title" => $title,
                        "quantity" => 1,
                        "unit_price" => (float)$price,
                        "currency_id" => "ARS"
                    ]
                ],
                "back_urls" => [
                    "success" => "https://tuweb.com/success",
                    "failure" => "https://tuweb.com/failure",
                    "pending" => "https://tuweb.com/pending"
                ],
                "notification_url" => "https://tuweb.com/notifications",
                "auto_return" => "approved"
            ]);

            // Retornamos los datos más importantes
            return [
                "id" => $preference->id,
                "init_point" => $preference->init_point,
                "sandbox_init_point" => $preference->sandbox_init_point ?? null
            ];

        } catch (MPApiException $e) {
            throw new \Exception("Error al crear la preferencia: " . $e->getMessage());
        }
    }
}
