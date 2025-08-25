<?php 

namespace Src\Service\User;

use Src\Entity\User\Exception\UserAlreadyExistsException;
use Src\Entity\User\User;
use Src\Infrastructure\Repository\User\UserRepository;

final readonly class UserCreatorService {
    private UserRepository $repository;
    private UserFinderByEmailService $userFinderByEmailService;

    public function __construct() {
        $this->repository = new UserRepository();
        $this->userFinderByEmailService = new UserFinderByEmailService();
    }

    public function create(string $name, string $email, string $password): void
    {
        $user = $this->userFinderByEmailService->find($email);

        if (!empty($user)) {
            throw new UserAlreadyExistsException();
        }

        $user = User::create($name, $email, $password);
        $this->repository->insert($user);
    }
}