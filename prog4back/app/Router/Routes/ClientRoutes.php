<?php 

final readonly class ClientRoutes {
  public static function getRoutes(): array {
    return [
      [
        "name" => "client_get",
        "url" => "/clients",
        "controller" => "Client/ClientGetController.php",
        "method" => "GET",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int"
          ]
        ]
      ],
      [
        "name" => "clients_get",
        "url" => "/clients",
        "controller" => "Client/ClientsGetController.php",
        "method" => "GET"
      ],
      [
        "name" => "client_create",
        "url" => "/clients",
        "controller" => "Client/ClientPostController.php",
        "method" => "POST"
      ],
      [
        "name" => "client_update",
        "url" => "/clients",
        "controller" => "Client/ClientPutController.php",
        "method" => "PUT",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int"
          ]
        ]
          ],
          [
            "name" => "client_delete",
            "url" => "/clients",
            "controller" => "Client/ClientDeleteController.php",
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
