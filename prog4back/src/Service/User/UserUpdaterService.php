<?php

namespace Src\Service\User;

use Src\Entity\User\User;
use Src\Infrastructure\Repository\User\UserRepository;

final readonly class UserUpdaterService{

    private UserRepository $repository;

    private UserFinderService $finderService;

    public function __construct() {
        $this->repository = new UserRepository();
        $this->finderService = new UserFinderService();
    }
    public function update(string $name, string $email, int $password,int $id): void{

        $user = $this->finderService->find($id);
        if (!$user) {
    
        throw new \Exception("Usuario con ID $id no encontrado.");
}

        $user->modify($name, $email, $password);

        $this->repository->update($user);
    }
    
}