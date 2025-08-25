<?php 

final readonly class DomainRoutes {
  public static function getRoutes(): array {
    return [
      [
        "name" => "domain_get",
        "url" => "/domains",
        "controller" => "Domain/DomainGetController.php",
        "method" => "GET",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int"
          ]
        ]
      ],
      [
        "name" => "domains_get",
        "url" => "/domains",
        "controller" => "Domain/DomainsGetController.php",
        "method" => "GET"
      ],
      [
        "name" => "domain_post",
        "url" => "/domains",
        "controller" => "Domain/DomainPostController.php",
        "method" => "POST"
      ],
      [
        "name" => "domain_put",
        "url" => "/domains",
        "controller" => "Domain/DomainPutController.php",
        "method" => "PUT",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int"
          ]
        ]
      ],
      [
        "name" => "domain_delete",
        "url" => "/domains",
        "controller" => "Domain/DomainDeleteController.php",
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
