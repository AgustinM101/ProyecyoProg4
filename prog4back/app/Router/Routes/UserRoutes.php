<?php 

final readonly class UserRoutes {
  public static function getRoutes(): array {
    return [
      [
        "name" => "user_get",
        "url" => "/users",
        "controller" => "User/UserGetController.php",
        "method" => "GET",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int",
          ]
        ]
      ],
      [
        "name" => "users_get",
        "url" => "/users",
        "controller" => "User/UsersGetController.php",
        "method" => "GET"
      ],
      [
        "name" => "user_create",
        "url" => "/users",
        "controller" => "User/UserPostController.php",
        "method" => "POST"
      ],
      [
        "name" => "user_update",
        "url" => "/users",
        "controller" => "User/UserPutController.php",
        "method" => "PUT",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int",

          ]
        ]
          ],
          [
            "name" => "user_delete",
            "url" => "/users",
            "controller" => "User/UserDeleteController.php",
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
