<?php 

final readonly class PlanAlimentoRoutes {
  public static function getRoutes(): array {
    return [

      
      [
        "name" => "planAlimentos_getByUserPlanId",
        "url" => "/userPlanAlimentos",
        "controller" => "PlanAlimento/PlanAlimentosGetByUserPlanIdController.php",
        "method" => "GET",
        "parameters" => [
          [
            "name" => "id",    // id_plans_user
            "type" => "int"
          ]
        ]
      ],

      
      [
          "name" => "userPlanAlimento_massive_create",
          "url" => "/userPlanAlimentos",
          "controller" => "PlanAlimento/PlanAlimentoMassivePostController.php",
          "method" => "POST",
          "parameters" => [
              [
                  "name" => "id",      // id_plans_user
                  "type" => "int"
              ]
          ]
      ],

     
      [
          "name" => "userPlanAlimento_massive_update",
          "url" => "/userPlanAlimentos",
          "controller" => "PlanAlimento/PlanAlimentoMassivePutController.php",
          "method" => "PUT",
          "parameters" => [
              [
                  "name" => "id",      // id_plans_user
                  "type" => "int"
              ]
          ]
      ],

    ];
  }
}
