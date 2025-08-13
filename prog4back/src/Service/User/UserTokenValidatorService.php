<?php 


declare(strict_types = 1);

namespace Src\Service\User;

use Src\Entity\User\User;
use Src\Entity\User\Exception\UserIsNotAuthorizedException;
use Src\Infrastructure\Repository\User\UserRepository;

final readonly class UserTokenValidatorService {

    private UserRepository $userRepository;

    public function __construct() 
    {
        $this->userRepository = new UserRepository();
    }

    public function validate(string $token): User 
    {
        $user = $this->userRepository->findByToken($token);

        if ($user === null) {
            throw new UserIsNotAuthorizedException();
        }

        return $user;
    }

}
