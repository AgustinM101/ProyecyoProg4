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
        MercadoPagoConfig::setAccessToken($_ENV['MP_ACCESS_TOKEN']); // desde .env
    }

    public function createPreference($userId, $nombre, $email, $plan, $amount) {
        $client = new PreferenceClient();

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

        // Guardar compra en base
        $purchase = new Purchase($userId, $plan, $amount, 'mercadopago', 'pending');
        $this->purchaseRepository->save($purchase);

        return $preference->init_point;
    }
}
