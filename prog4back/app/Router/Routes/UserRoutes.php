<?php 

final readonly class UserRoutes {
  public static function getRoutes(): array {
    return [
      [
        "name" => "user_login",
        "url" => "/login",
        "controller" => "User/UserLoginController.php",
        "method" => "POST"
      ],
      [
        "name" => "user_create",
        "url" => "/users",
        "controller" => "User/UserPostController.php",
        "method" => "POST"
      ],
      [
        "name" => "users_get",
        "url" => "/users",
        "controller" => "User/UsersGetController.php",
        "method" => "GET"
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
      ],
      [
        "name" => "user_update",
        "url" => "/user",
        "controller" => "User/UserPutController.php",
        "method" => "PUT"
      ],
      // 🔹 Nueva ruta específica para actualizar perfil (desde el front ProfilePage)
      [
        "name" => "user_update_profile",
        "url" => "/user",
        "controller" => "User/UserUpdateProfileController.php",
        "method" => "POST"
      ],
      [
        "name" => "user_get",
        "url" => "/user",
        "controller" => "User/UserGetLoggedController.php",
        "method" => "GET"
      ],
      [
        "name" => "user_get_by_id",
        "url" => "/users",
        "controller" => "User/UserGetController.php",
        "method" => "GET",
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
