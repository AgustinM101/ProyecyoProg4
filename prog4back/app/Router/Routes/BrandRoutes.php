<?php 

final readonly class BrandRoutes {
  public static function getRoutes(): array {
    return [
      [
        "name" => "brand_get",
        "url" => "/brands",
        "controller" => "Brand/BrandGetController.php",
        "method" => "GET",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int"
          ]
        ]
      ],
      [
        "name" => "brands_get",
        "url" => "/brands",
        "controller" => "Brand/BrandsGetController.php",
        "method" => "GET"
      ],
      [
        "name" => "brand_create",
        "url" => "/brands",
        "controller" => "Brand/BrandPostController.php",
        "method" => "POST"
      ],
      [
        "name" => "brand_update",
        "url" => "/brands",
        "controller" => "Brand/BrandPutController.php",
        "method" => "PUT",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int"
          ]
        ]
          ],
          [
            "name" => "brand_delete",
            "url" => "/brands",
            "controller" => "Brand/BrandDeleteController.php",
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
