<?php

use Src\Service\User\UserDeleteService;

final readonly class UserDeleteController
{
    private UserDeleteService $service;


    public function __construct() {
        $this->service = new UserDeleteService;
    }

    public function start(int $id): void {

    
        

        $this->service->delete($id);
    }


}
