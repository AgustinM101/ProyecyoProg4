<?php 


declare(strict_types = 1);

namespace Src\Service\User;

use Src\Entity\User\User;
use Src\Infrastructure\Repository\User\UserRepository;

final readonly class UserTokenGeneratorService {

    private UserRepository $userRepository;

    public function __construct() 
    {
        $this->userRepository = new UserRepository();
    }

    public function generate(User $user): User 
    {
        $user->generateToken();

        $this->userRepository->update($user);

        return $user;
    }

}
