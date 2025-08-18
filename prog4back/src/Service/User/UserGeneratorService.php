<?php 

namespace Src\Service\User;

use Src\Entity\User\User;
use Src\Infrastructure\Repository\User\UserRepository;

final readonly class UserCreatorService {
    private UserRepository $repository;

    public function __construct() {
        $this->repository = new UserRepository();
    }

    public function create(string $name, string $email, string $password): void
    {
        $user = User::create($name, $email, $password);
        $this->repository->insert($user);
    }
}