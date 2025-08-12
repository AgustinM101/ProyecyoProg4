<?php

use Src\Service\Brand\BrandUpdaterService;
use Src\Utils\ControllerUtils;

final readonly class BrandPutController
{
    private BrandUpdaterService $service;

    public function __construct() {
        $this->service = new BrandUpdaterService;
    }

    public function start(int $id): void {
        $name = ControllerUtils::getPost("name");
        $code = ControllerUtils::getPost("code");
        


        $brand = $this->service->update($name, $code, $id);
    }


}


