<?php 

use Src\Service\User\UserFinderService;

final readonly class UserLoginController {

    private UserFinderService $service;

    public function __construct() {
        $this->service = new UserFinderService();
    }

    public function start(int $id): void
    {
        $user = $this->service->find($id);
        
        echo json_encode([
                "id" => $user->id(),
                "name" => $user->name(),
                "email" => $user->email(),
                "password" => $user->password(),
                "token" => $user->token(),
                "token_expiration_date" => $user->token_expiration_date()
        ]);
    }
}