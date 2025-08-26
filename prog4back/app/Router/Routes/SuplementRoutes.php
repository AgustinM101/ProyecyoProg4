<?php 

final readonly class SuplementRoutes {
  public static function getRoutes(): array {
    return [


     [
        "name" => "suplement_create",
        "url" => "/suplements",
        "controller" => "Suplement/SuplementPostController.php",
        "method" => "POST"
      ],
     
      [
        "name" => "suplement_get",
        "url" => "/suplements",
        "controller" => "Suplement/SuplementGetController.php",
        "method" => "GET",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int",
          ]
        ]
      ],
      [
        "name" => "suplements_get",
        "url" => "/suplements",
        "controller" => "Suplement/SuplementsGetController.php",
        "method" => "GET"
      ],
      [
        "name" => "suplement_create",
        "url" => "/suplements",
        "controller" => "Suplement/SuplementPostController.php",
        "method" => "POST"
      ],
      [
        "name" => "suplement_update",
        "url" => "/suplements",
        "controller" => "Suplement/SuplementPutController.php",
        "method" => "PUT",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int",

          ]
        ]
          ],
          [
            "name" => "suplement_delete",
            "url" => "/suplements",
            "controller" => "Suplement/SuplementDeleteController.php",
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
