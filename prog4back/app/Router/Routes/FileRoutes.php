<?php 

final readonly class FileRoutes {
  public static function getRoutes(): array {
    return [
      [
        "name" => "file_upload",
        "url" => "/files/upload",
        "controller" => "File/FilePostController.php",
        "method" => "POST"
      ]
    ];
  }
}
