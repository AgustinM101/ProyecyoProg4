<?php 

declare(strict_types = 1);

namespace Src\Infrastructure\Repository\User;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\User\User;
use dateTime;

final readonly class UserRepository extends PDOManager implements UserRepositoryInterface {

    public function findByEmailAndPassword(string $email, string $password): ?User 
    {
        $query = "SELECT * FROM users WHERE email and password= :password";

        $parameters = [
            "email" => $email,
            "password" => $password,
        ];

        $result = $this->execute($query, $parameters);
        
        $user = $this->primitiveToUser($result[0] ?? null); 

        }
        

    public function findByToken(string $token): ?User 
    {
        $query = "SELECT * FROM users WHERE token = :token AND :date <= token_auth_date";

        $parameters = [
            "token" => $token,
            "date" => date("Y-m-d H:i:s"),
        ];

        $result = $this->execute($query, $parameters);
        
        return $this->primitiveToUser($result[0] ?? null);
    }

    public function update(User $user): void
    {
        $query = <<<UPDATE_QUERY
                        UPDATE
                            users
                        SET
                            email = :email,
                            password = :password,
                            token = :token,
                            token_auth_date = :tokenAuthDate
                        WHERE
                            id = :id
                    UPDATE_QUERY;

        $parameters = [
            "email" => $user->email(),
            "password" => $user->password(),
            "token" => $user->token(),
            "tokenAuthDate" => $user->tokenAuthDate()->format("Y-m-d H:i:s"),
            "id" => $user->id()
        ];

        $this->execute($query, $parameters);
    }

    private function primitiveToUser(?array $primitive): ?User
    {
        if ($primitive === null) {
            return null;
        }

        return new User(
            $primitive["id"],
            $primitive["name"],
            $primitive["email"],
            $primitive["password"],
            $primitive["token"],
            new DateTime($primitive["token_auth_date"]),
        );
    }
}