<?php 

declare(strict_types = 1);

namespace Src\Infrastructure\Repository\Users;

use DateTime;
use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\Users\Users;

final readonly class UserRepository extends PDOManager implements UserRepositoryInterface {

    public function findByEmail(string $email): ?Users 
    {
        $query = "SELECT * FROM users WHERE email = :email";

        $parameters = [
            "email" => $email,
        ];

        $result = $this->execute($query, $parameters);
        
        $user = $this->primitiveToUser($result[0] ?? null); 

        if (empty($users)) {
            return null;
        }

        return $user;
    }

    public function findByEmailAndPassword(string $email, string $password): ?Users
    {
        $users = $this->findByEmail($email);

        if (empty($users)) {
            return null;
        }

        if (password_verify($password, $users->password())) {
            return $users;
        }
        
        return null;
    }

    public function findByToken(string $token): ?Users
    {
        $query = "SELECT * FROM users WHERE token = :token AND :date <= token_auth_date";

        $parameters = [
            "token" => $token,
            "date" => date("Y-m-d H:i:s"),
        ];

        $result = $this->execute($query, $parameters);
        
        return $this->primitiveToUser($result[0] ?? null);
    }

    public function insert(Users $users): void
    {
        $query = <<<INSERT_QUERY
                    INSERT INTO
                        users
                    (name, email, password, token)
                        VALUES
                    (:name, :email, :password, :token)
                INSERT_QUERY;
            
        $parameters = [
            "name" => $users->name(),
            "email" => $users->email(),
            "password" => $users->password(),
            "token" => "",
        ];

        $this->execute($query, $parameters);
    }

    public function update(Users $users): void
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
            "email" => $users->email(),
            "password" => $users->password(),
            "token" => $users->token(),
            "tokenAuthDate" => $users->tokenAuthDate()->format("Y-m-d H:i:s"),
            "id" => $users->id()
        ];

        $this->execute($query, $parameters);
    }

    private function primitiveToUser(?array $primitive): ?Users
    {
        if ($primitive === null) {
            return null;
        }

        return new Users(
            $primitive["id"],
            $primitive["name"],
            $primitive["email"],
            $primitive["password"],
            $primitive["token"],
            new DateTime($primitive["token_auth_date"]),
        );
    }
}