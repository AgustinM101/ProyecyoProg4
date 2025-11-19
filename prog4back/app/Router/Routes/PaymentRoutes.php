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

      // RUTA PARA EL WEBHOOK
      [
        "name" => "payment_webhook",
        "url" => "/payment_ipn",
        "controller" => "Payment/PaymentIpnController.php",
        "method" => "POST"
      ],

      // NUEVA RUTA PARA STATUS DE PAGO (frontend polling)
      [
        "name" => "payment_status",
        "url" => "/api/payments/status",
        "controller" => "Payment/PaymentStatusController.php",
        "method" => "GET"
      ],
    ];
  }
}


