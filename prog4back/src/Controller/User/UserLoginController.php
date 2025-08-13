<?php

use Src\Utils\ControllerUtils;
use Src\Service\User\UserLoginService;

final readonly class UserLoginController {
    private UserLoginService $service;

    public function __construct() {
        $this->service = new UserLoginService();
    }

    public function start(): void
    {
        $email = ControllerUtils::getPost("email");
        $password = ControllerUtils::getPost("password");

        $user = $this->service->login($email, $password);

        echo json_encode([
            "token" => $user->token(),
            "expiration_date" => $user->tokenAuthDate()->format("Y-m-d H:i:s"),
        ]);
    }
}