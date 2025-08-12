<?php

use Src\Service\Category\CategoryUpdaterService;
use Src\Utils\ControllerUtils;

final readonly class CategoryPutController
{
    private CategoryUpdaterService $service;

    public function __construct() {
        $this->service = new CategoryUpdaterService;
    }

    public function start(int $id): void {
        $name = ControllerUtils::getPost("name");
        $imageUrl = ControllerUtils::getPost("imageUrl");


        $category = $this->service->update($name, $imageUrl, $id);
    }


}


