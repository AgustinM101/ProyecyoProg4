<?php 


declare(strict_types = 1);

namespace Src\Service\User;

use Src\Entity\User\User;
use Src\Entity\User\Exception\UserInvalidCredentialsException;
use Src\Infrastructure\Repository\User\UserRepository;

final readonly class UserLoginService {

    private UserRepository $userRepository;
    private UserTokenGeneratorService $tokenGenerator;

    public function __construct() 
    {
        $this->userRepository = new UserRepository();
        $this->tokenGenerator = new UserTokenGeneratorService();
    }

    public function login(string $email, string $password): User 
    {
        $user = $this->userRepository->findByEmailAndPassword($email, $password);

        if ($user === null) {
            throw new UserInvalidCredentialsException();
        }

        return $this->tokenGenerator->generate($user);
    }

}
