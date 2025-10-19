<?php 

final readonly class LogRoutes {
  public static function getRoutes(): array {
    return [
      [
        "name" => "log_get_all",
        "url" => "/logs",
        "controller" => "Log/LogGetController.php",
        "method" => "GET"
      ],
      [
        "name" => "log_create",
        "url" => "/logs",
        "controller" => "Log/LogPostController.php",
        "method" => "POST"
      ]
    ];
  }
}
