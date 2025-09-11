<?php 


declare(strict_types = 1);

namespace Src\Service\User;

use Src\Entity\User\User;
use Src\Infrastructure\Repository\User\UserRepository;

final readonly class UserFinderByToken {

    private UserRepository $userRepository;

    public function __construct() 
    {
        $this->userRepository = new UserRepository();
    }

    public function find(string $token): ?User 
    {
        return $this->userRepository->findByToken($token);
    }

}
