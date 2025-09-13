<?php 

final readonly class PlanAlimentoRoutes {
  public static function getRoutes(): array {
    return [
  [
        "name" => "planAlimento_get",
        "url" => "/planAlimentos",
        "controller" => "PlanAlimento/PlanAlimentoGetController.php",
        "method" => "GET",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int"
          ]
        ]
      ],
      [
        "name" => "planAlimentos_get",
        "url" => "/planAlimentos",
        "controller" => "PlanAlimento/PlanAlimentosGetController.php",
        "method" => "GET"
      ],
      [
        "name" => "planAlimento_create",
        "url" => "/planAlimentos",
        "controller" => "PlanAlimento/PlanAlimentoPostController.php",
        "method" => "POST"
      ],
      [
        "name" => "planAlimento_update",
        "url" => "/planAlimentos",
        "controller" => "PlanAlimento/PlanAlimentoPutController.php",
        "method" => "PUT",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int"
          ]
        ]
      ],
      [
        "name" => "planAlimento_delete",
        "url" => "/planAlimentos",
        "controller" => "PlanAlimento/PlanAlimentoDeleteController.php",
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
