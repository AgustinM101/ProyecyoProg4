<?php

use Src\Service\Category\CategoryDeleterService;

final readonly class CategoryDeleteController
{
    private CategoryDeleterService $service;
   

    public function __construct() {
        $this->service = new CategoryDeleterService;
    }

    public function start(int $id): void {



        $this->service->delete($id);
    }


}


