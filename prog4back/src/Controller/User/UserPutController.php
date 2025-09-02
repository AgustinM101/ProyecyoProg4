<?php

use Src\Service\User\UserUpdaterService;
use Src\Utils\ControllerUtils;

final readonly class UserPutController
{
    private UserUpdaterService $service;

    public function __construct() {
        $this->service = new UserUpdaterService;
    }

    public function start(int $id): void {
        $name = ControllerUtils::getPost("name");
        $email = ControllerUtils::getPost("email");
        $password = ControllerUtils::getPost("password");
        $token = ControllerUtils::getPost("token");
        $tokenExpirationDate = ControllerUtils::getPost("token_expiration_date");
        $role = ControllerUtils::getPost("role");

    }

    $user = $this->service->update($name, $email, $password, $token, $tokenExpirationDate, $role, $id);
    }


}