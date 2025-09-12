<?php 

final readonly class UserRoutes {
  public static function getRoutes(): array {
    return [
      [
        "name" => "user_login",
        "url" => "/users/login",
        "controller" => "User/UserLoginController.php",
        "method" => "POST"
      ],
      [
        "name"=>"user_create",
        "url"=>"/users",
        "controller"=>"User/UserPostController.php",
        "method"=>"POST"
      ],
      [
        "name" => "users_get",
        "url" => "/users",
        "controller" => "User/UserGetController.php",
        "method" => "GET"
      ],
      [
        "name" => "user_get",
        "url" => "/users",
        "controller" => "User/UserGetController.php",
        "method" => "GET"
      ]
    ];
  }
}
