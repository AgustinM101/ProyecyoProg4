<?php

use Src\Utils\ControllerUtils;
use Src\Service\Client\ClientCreatorService;

final readonly class ClientPostController
{
    private ClientCreatorService $service;

    public function __construct() {
        $this->service = new ClientCreatorService();
    }

    public function start(): void {
        $dni = ControllerUtils::getPost("dni");
        $name = ControllerUtils::getPost("name");
        $surname = ControllerUtils::getPost("surname");

        $client = $this->service->create($dni, $name, $surname);
        
    }


}


