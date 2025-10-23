<?php 

final readonly class AdminRoutes {
  public static function getRoutes(): array {
    return [
      [
        "name" => "admin_validate",
        "url" => "/admin/validate",
        "controller" => "Admin/AdminValidateController.php",
        "method" => "GET"
      ],
    ];
  }
}
