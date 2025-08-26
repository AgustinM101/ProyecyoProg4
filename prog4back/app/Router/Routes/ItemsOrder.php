<?php 

final readonly class ItemsOrderRoutes {
  public static function getRoutes(): array {
    return [
      [
        "name" => "itemsOrder_get",
        "url" => "/itemsOrders",
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
        "url" => "/itemsOrders",
        "controller" => "ItemsOrder/ItemsOrdersGetController.php",
        "method" => "GET"
      ],
      [
        "name" => "itemsOrder_create",
        "url" => "/itemsOrders",
        "controller" => "ItemsOrder/ItemsOrderPostController.php",
        "method" => "POST"
      ],
      [
        "name" => "itemsOrder_update",
        "url" => "/itemsOrders",
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
            "url" => "/itemsOrders",
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