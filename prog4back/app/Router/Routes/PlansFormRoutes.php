<?php 

final readonly class PlansFormRoutes {
  public static function getRoutes(): array {
    return [

      [
        "name" => "plansForm_create",
        "url" => "/plansForm",
        "controller" => "PlansForm/PlansFormPostController.php",
        "method" => "POST"
      ],

       [
        "name" => "plansForm_get",
        "url" => "/plansForm",
        "controller" => "PlansForm/PlansFormGetController.php",
        "method" => "GET",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int"
          ]
        ]
      ],
      [
                "name" => "plansForm_getByUserPlanId",
                "url" => "/PlansFormsByUserPlanId",
                "controller" => "PlansForm/PlansFormGetByUserPlanIdController.php",
                "method" => "GET",
                "parameters" => [
                    [
                        "name" => "id",
                        "type" => "int"
                    ]
                ]
            ],

      [
        "name" => "plansForm_getbyuser",
        "url" => "/plansFormbyuser",
        "controller" => "PlansForm/PlansFormGetByUserController.php",
        "method" => "GET",

        
      ],

      [
        "name" => "plansForm_get",
        "url" => "/plansForms",
        "controller" => "PlansForm/PlansFormsGetController.php",
        "method" => "GET"
      ],

      [
        "name" => "plansForm_update",
        "url" => "/plansForms",
        "controller" => "PlansForm/PlansFormPutController.php",
        "method" => "PUT",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int"
          ]
        ]
      ],

      [
        "name" => "plansForm_delete",
        "url" => "/plansForms",
        "controller" => "PlansForm/PlansFormDeleteController.php",
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
