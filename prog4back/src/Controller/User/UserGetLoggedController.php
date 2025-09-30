<?php 

use Src\Utils\ControllerUtils;
use Src\Infrastructure\Repository\User\UserRepository;

final readonly class UserGetLoggedController {

    private UserRepository $service;

    public function __construct() {
        $this->service = new UserRepository();
    }

    public function start(): void
    {
        $token = ControllerUtils::getHeaderToken();
        $user = $this->service->findByToken($token);
        
        echo json_encode([
            "token" => $user->id(),
            "name" => $user->name(),
            "email" => $user->email(),
            "admin" => $user->admin(),
        ]);
    }
}