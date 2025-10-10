<?php

final readonly class PlansUserRoutes {

    public static function getRoutes(): array {
        return [
            [
                "name" => "plans_users_get_all",
                "url" => "/plansUsers",
                "controller" => "PlansUser/PlansUserGetAllController.php",
                "method" => "GET"
            ],
            [
                "name" => "plans_users_get_by_user",
                "url" => "/plansUsers",
                "controller" => "PlansUser/PlansUserGetByUserController.php",
                "method" => "GET",
                "parameters" => [
                    [
                        "name" => "id_user",
                        "type" => "int"
                    ]
                ]
            ],

            [
                "name" => "plans_users_create",
                "url" => "/plansUsers",
                "controller" => "PlansUser/PlansUserPostController.php",
                "method" => "POST"
            ],
            [
                "name" => "plans_users_remove",
                "url" => "/plansUsers",
                "controller" => "PlansUser/PlansUserRemoveController.php",
                "method" => "DELETE",
                "parameters" => [
                    [
                        "name" => "id",
                        "type" => "int"
                    ]
                ]
            ],

            [
                "name" => "plans_users_update",
                "url" => "/plansUsers",
                "controller" => "PlansUser/PlansUserPutController.php",
                "method" => "PUT",
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
