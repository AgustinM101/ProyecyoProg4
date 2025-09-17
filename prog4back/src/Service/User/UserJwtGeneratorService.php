<?php

namespace Src\Service\User;

use Src\Entity\User\User;
use Src\Infrastructure\Repository\User\UserRepository;

final readonly class UserJwtGeneratorService{

    private UserRepository $repository;

    private UserFinderService $finderService;

    public function __construct() {
        $this->repository = new UserRepository();
        $this->finderService = new UserFinderService();
    }
    public function update(string $name, string $email, string $password, string $token, string $token_auth_date, int $id): void{

        $user = $this->finderService->find($id);
        $jwt = md5(rand(1000, 9999));
        $user->modify($jwt);
        

        $this->repository->update($user);
    }
    
}