<?php

use Src\Utils\ControllerUtils;
use Src\Service\User\UserCreatorService;

final readonly class UserPostController {
    private UserCreatorService $service;

    public function __construct() {
        $this->service = new UserCreatorService();
    }

    public function start(): void
    {
        $name = ControllerUtils::getPost("name");
        $email = ControllerUtils::getPost("email");
        $password = ControllerUtils::getPost("password");

        $this->service->create($name, $email, $password);
    }
}