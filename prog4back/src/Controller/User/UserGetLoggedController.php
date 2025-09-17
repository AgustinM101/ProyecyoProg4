<?php 

use Src\Infrastructure\Repository\User\UserRepository;

final readonly class UserGetLoggedController {

    private UserRepository $service;

    public function __construct() {
        $this->service = new UserRepository();
    }

    public function start(): void
    {
        $token = $_SERVER["HTTP_X_API_KEY"] ?? "";
        $user = $this->service->findByToken($token);
        
        echo json_encode([
            "token" => $user->id(),
            "name" => $user->name(),
            "email" => $user->email(),
            "role" => $user->role(),
        ]);
    }
}