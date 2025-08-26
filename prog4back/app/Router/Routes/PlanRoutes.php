<?php 

final readonly class PlanRoutes {
  public static function getRoutes(): array {
    return [


     [
        "name" => "plan_create",
        "url" => "/plans",
        "controller" => "Plan/PlanPostController.php",
        "method" => "POST"
      ],
     
      [
        "name" => "plan_get",
        "url" => "/plans",
        "controller" => "Plan/PlanGetController.php",
        "method" => "GET",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int",
          ]
        ]
      ],
      [
        "name" => "plans_get",
        "url" => "/plans",
        "controller" => "Plan/PlansGetController.php",
        "method" => "GET"
      ],
      [
        "name" => "plan_create",
        "url" => "/plans",
        "controller" => "Plan/PlanPostController.php",
        "method" => "POST"
      ],
      [
        "name" => "plan_update",
        "url" => "/plans",
        "controller" => "Plan/PlanPutController.php",
        "method" => "PUT",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int",

          ]
        ]
          ],
          [
            "name" => "plan_delete",
            "url" => "/plans",
            "controller" => "Plan/PlanDeleteController.php",
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
