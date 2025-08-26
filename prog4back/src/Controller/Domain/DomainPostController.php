<?php

use Src\Utils\ControllerUtils;
use Src\Service\Domain\DomainCreatorService;

final readonly class DomainPostController {
    private DomainCreatorService $service;

    public function __construct() {
        $this->service = new DomainCreatorService();
    }

    public function start(): void
    {
        $name = ControllerUtils::getPost("name");
        $code = ControllerUtils::getPost("code");

        $this->service->create($name, $code);
    }
}