<?php 

use Src\Service\User\UsersSearcherService;

final readonly class UsersGetController {
    private UsersSearcherService $service;

    public function __construct() {
        $this->service = new UsersSearcherService();
    }

    public function start(): void
    {
        $users = $this->service->search();

        echo json_encode($this->toResponse($users));
    }

    private function toResponse(array $users): array 
    {
        $responses = [];
        
        foreach($users as $user) {
            $responses[] = [
                "id" => $user->id(),
                "name" => $user->name(),
                "email" => $user->email(),
                "password" => $user->password(),
                "token" => $user->token(),
                "token_auth_date" => $user->tokenAuthDate(),
                "role" => $user->role(),
            ];
        }

        return $responses;
    }
}