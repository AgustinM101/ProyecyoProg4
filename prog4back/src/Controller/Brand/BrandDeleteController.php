<?php

use Src\Service\Brand\BrandDeleterService;

final readonly class BrandDeleteController
{
    private BrandDeleterService $service;
   

    public function __construct() {
        $this->service = new BrandDeleterService;
    }

    public function start(int $id): void {

        

        $this->service->delete($id);
    }


}


