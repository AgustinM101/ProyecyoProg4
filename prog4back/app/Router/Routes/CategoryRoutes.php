<?php 

final readonly class CategoryRoutes {
  public static function getRoutes(): array {
    return [
      [
        "name" => "category_get",
        "url" => "/categories",
        "controller" => "Category/CategoryGetController.php",
        "method" => "GET",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int"
          ]
        ]
      ],
      [
        "name" => "categories_get",
        "url" => "/categories",
        "controller" => "Category/CategoriesGetController.php",
        "method" => "GET"
      ],
      [
        "name" => "category_create",
        "url" => "/categories",
        "controller" => "Category/CategoryPostController.php",
        "method" => "POST"
      ],
      [
        "name" => "category_update",
        "url" => "/categories",
        "controller" => "Category/CategoryPutController.php",
        "method" => "PUT",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int"
          ]
        ]
          ],
          [
            "name" => "category_delete",
            "url" => "/categories",
            "controller" => "Category/CategoryDeleteController.php",
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
