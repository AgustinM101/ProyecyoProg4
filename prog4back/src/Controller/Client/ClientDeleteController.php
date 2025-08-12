<?php

use Src\Service\Client\ClientDeleterService;

final readonly class ClientDeleteController
{
    private ClientDeleterService $service;
    

    public function __construct() {
        $this->service = new ClientDeleterService;
    }

    public function start(int $id): void {

        

        $this->service->delete( $id);
    }


}


