<?php 

final readonly class OrderListRoutes {
  public static function getRoutes(): array {
    return [
      [
        "name" => "orderList_get",
        "url" => "/orderlists",
        "controller" => "OrderList/OrderListGetController.php",
        "method" => "GET",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int"
          ]
        ]
      ],
      [
        "name" => "orderLists_get",
        "url" => "/orderLists",
        "controller" => "OrderList/OrderListsGetController.php",
        "method" => "GET"
      ],
      [
        "name" => "orderList_create",
        "url" => "/orderLists",
        "controller" => "   OrderList/OrderListPostController.php",
        "method" => "POST"
      ],
      [
        "name" => "orderList_update",
        "url" => "/orderLists",
        "controller" => "OrderList/OrderListPutController.php",
        "method" => "PUT",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int"
          ]
        ]
          ],
          [
            "name" => "orderList_delete",
            "url" => "/orderLists",
            "controller" => "OrderList/OrderListDeleteController.php",
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