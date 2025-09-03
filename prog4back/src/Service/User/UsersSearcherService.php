<?php 

namespace Src\Service\User;

use Src\Entity\User\User;
use Src\Infrastructure\Repository\User\UserRepository;

final readonly class UsersSearcherService {
    private UserRepository $repository;

    public function __construct() {
        $this->repository = new UserRepository();
    }

    /** @return User[] */
    public function search(): array
    {
        return $this->repository->search();
    }
}