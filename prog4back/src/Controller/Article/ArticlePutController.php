<?php

use Src\Service\Article\ArticleUpdaterService;
use Src\Utils\ControllerUtils;

final readonly class ArticlePutController
{
    private ArticleUpdaterService $service;

    public function __construct() {
        $this->service = new ArticleUpdaterService;
    }

    public function start(int $id): void {
        $price = ControllerUtils::getPost("price");
        $description = ControllerUtils::getPost("description");
        $stock = ControllerUtils::getPost("stock");
        $imageUrl = ControllerUtils::getPost("imageUrl");
        $name = ControllerUtils::getPost("name");


        $article = $this->service->update($price, $description, $stock, $imageUrl, $name, $id);
    }


}


