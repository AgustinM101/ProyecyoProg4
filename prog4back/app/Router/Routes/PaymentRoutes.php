<?php

final readonly class PaymentRoutes {
  public static function getRoutes(): array {
    return [
      [
        "name" => "payment_create_preference",
        "url" => "/payment",
        "controller" => "Payment/PaymentController.php",
        "method" => "POST"
      ],
    ];
  }
}
