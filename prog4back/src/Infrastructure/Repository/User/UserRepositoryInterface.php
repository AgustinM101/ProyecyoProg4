<?php 

namespace Src\Infrastructure\Repository\User;

use Src\Entity\User\User;

interface UserRepositoryInterface {
    
    public function findByEmailAndPassword(string $email,string $password): ?User;
    public function update(User $user): void;
    public function findByToken(string $token, string $token_expiration_date): ?User

        /** @return User[] */

}

