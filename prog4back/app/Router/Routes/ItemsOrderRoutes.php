<?php

final readonly class ItemsOrderRoutes {
  public static function getRoutes(): array {
    return [
      [
        "name" => "itemsOrder_get",
        "url" => "/items-orders",
        "controller" => "ItemsOrder/ItemsOrderGetController.php",
        "method" => "GET",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int"
          ]
        ]
      ],
      [
        "name" => "itemsOrders_get",
        "url" => "/items-orders",
        "controller" => "ItemsOrder/ItemsOrdersGetController.php",
        "method" => "GET"
      ],
      [
        "name" => "itemsOrder_create",
        "url" => "/items-orders",
        "controller" => "ItemsOrder/ItemsOrderPostController.php",
        "method" => "POST"
      ],
      [
        "name" => "itemsOrder_update",
        "url" => "/items-orders",
        "controller" => "ItemsOrder/ItemsOrderPutController.php",
        "method" => "PUT",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int"
          ]
        ]
      ],
      [
        "name" => "itemsOrder_delete",
        "url" => "/items-orders",
        "controller" => "ItemsOrder/ItemsOrderDeleteController.php",
        "method" => "DELETE",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int"
          ]
        ]
      ]
    ];
  }
}
