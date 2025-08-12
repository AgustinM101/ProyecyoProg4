<?php

use Src\Utils\ControllerUtils;
use Src\Service\Category\CategoryCreatorService;

final readonly class CategoryPostController
{
    private CategoryCreatorService $service;

    public function __construct() {
        $this->service = new CategoryCreatorService();
    }

    public function start(): void {
        $name = ControllerUtils::getPost("name");
        $imageUrl = ControllerUtils::getPost("imageUrl");

        $category = $this->service->create($name, $imageUrl);
        
    }


}


