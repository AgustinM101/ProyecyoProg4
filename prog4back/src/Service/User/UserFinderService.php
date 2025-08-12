<?php 

namespace Src\Service\User;

use Src\Entity\User\User;
use Src\Infrastructure\Repository\User\UserRepository;
use Src\Entity\Article\Exception\UserNotFoundException;

final readonly class UserFinderService {

    private UserRepository $repository;

    public function __construct() {
        $this->repository = new UserRepository();
    }

    public function findByEmailAndPassword(string $email, string $password): User 
    {   
        $user = $this->repository->findByEmailAndPassword($email, $password);

        if ($user === null) {
            throw new UserNotFoundException($email, $password);
        }

        return $user;
    }
}