<?php 

declare(strict_types = 1);

namespace Src\Infrastructure\Repository\Users;

use Src\Entity\Users\Users;

interface UserRepositoryInterface {
    public function findByEmailAndPassword(string $email, string $password): ?Users;
    public function findByToken(string $token): ?Users;

    public function insert(Users $users): void;
    public function update(Users $users): void;
}