<?php

use Src\Utils\ControllerUtils;
use Src\Service\Brand\BrandCreatorService;

final readonly class BrandPostController
{
    private BrandCreatorService $service;

    public function __construct() {
        $this->service = new BrandCreatorService();
    }

    public function start(): void {
        $name = ControllerUtils::getPost("name");
        $code = ControllerUtils::getPost("code");


        $brand = $this->service->create($name, $code);
        
    }


}


