<?php 

final readonly class PlanAlimentoRoutes {
  public static function getRoutes(): array {
    return [

      [
        "name" => "planAlimento_create",
        "url" => "/planAlimento",
        "controller" => "PlanAlimento/PlanAlimentoPostController.php",
        "method" => "POST"
      ],

      [
        "name" => "planAlimento_get",
        "url" => "/planAlimento/{id}",
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
        "name" => "planAlimento_get",
        "url" => "/planAlimento",
        "controller" => "PlanAlimento/PlanAlimentoGetController.php",
        "method" => "GET"
      ],

      [
        "name" => "planAlimento_update",
        "url" => "/planAlimento/{id}",
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
        "url" => "/planAlimento/{id}",
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
