<?php
// services/PaymentService.php
require_once __DIR__ . '/../repositories/PurchaseRepository.php';
require_once __DIR__ . '/../vendor/autoload.php';

use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\MercadoPagoConfig;

class PaymentService {
    private $purchaseRepository;

    public function __construct($purchaseRepository) {
        $this->purchaseRepository = $purchaseRepository;

        // 🔹 Validar que el Access Token esté cargado
        if (empty($_ENV['MP_ACCESS_TOKEN'])) {
            throw new Exception("Error: el Access Token de Mercado Pago no está definido en el .env");
        }

        MercadoPagoConfig::setAccessToken($_ENV['MP_ACCESS_TOKEN']); // desde .env
    }

    public function createPreference($userId, $nombre, $email, $plan, $amount) {
        $client = new PreferenceClient();

        try {
            $preference = $client->create([
                "items" => [
                    [
                        "title" => $plan,
                        "quantity" => 1,
                        "currency_id" => "ARS",
                        "unit_price" => (float) $amount
                    ]
                ],
                "payer" => [
                    "name" => $nombre,
                    "email" => $email
                ],
                "back_urls" => [
                    "success" => "http://localhost:5173/success",
                    "failure" => "http://localhost:5173/failure",
                    "pending" => "http://localhost:5173/pending"
                ],
                "auto_return" => "approved"
            ]);
        } catch (Exception $e) {
            throw new Exception("Error al crear preferencia en Mercado Pago: " . $e->getMessage());
        }

        // 🔹 Validar que se haya recibido un ID de preferencia
        if (empty($preference->id)) {
            throw new Exception("Error: no se recibió ID de preferencia desde Mercado Pago");
        }

        // Guardar compra en base
        $purchase = new Purchase($userId, $plan, $amount, 'mercadopago', 'pending');
        $purchase->preferenceId = $preference->id; // ✅ vincula la compra con Mercado Pago

        $savedId = $this->purchaseRepository->save($purchase);

        // 🔹 Validar que se haya guardado correctamente
        if (!$savedId) {
            throw new Exception("Error: no se pudo guardar la compra en la base de datos");
        }

        return $preference->init_point;
    }
}
