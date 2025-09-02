<?php 

final readonly class PlanEjercicioRoutes {
  public static function getRoutes(): array {
    return [

      [
        "name" => "planEjercicio_create",
        "url" => "/planEjercicios",
        "controller" => "PlanEjercicio/PlanEjercicioPostController.php",
        "method" => "POST"
      ],

      [
        "name" => "planEjercicio_get",
        "url" => "/planEjercicios/{id}",
        "controller" => "PlanEjercicio/PlanEjercicioGetController.php",
        "method" => "GET",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int"
          ]
        ]
      ],

      [
        "name" => "planEjercicios_get",
        "url" => "/planEjercicios",
        "controller" => "PlanEjercicio/PlanEjerciciosGetController.php",
        "method" => "GET"
      ],

      [
        "name" => "planEjercicio_update",
        "url" => "/planEjercicios/{id}",
        "controller" => "PlanEjercicio/PlanEjercicioPutController.php",
        "method" => "PUT",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int"
          ]
        ]
      ],

      [
        "name" => "planEjercicio_delete",
        "url" => "/planEjercicios/{id}",
        "controller" => "PlanEjercicio/PlanEjercicioDeleteController.php",
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
