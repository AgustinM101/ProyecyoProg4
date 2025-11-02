<?php

final readonly class PaymentIpnRoutes {
    public static function getRoutes(): array {
        return [
            [
                "name" => "payment_ipn",
                "url" => "/payment_ipn",
                "controller" => "Payment/PaymentIpnController.php",
                "method" => "POST"
            ],
        ];
    }
}
