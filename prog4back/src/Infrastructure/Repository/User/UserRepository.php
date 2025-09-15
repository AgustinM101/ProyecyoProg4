<?php 

declare(strict_types = 1);

namespace Src\Infrastructure\Repository\User;

use DateTime;
use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\User\User;

final readonly class UserRepository extends PDOManager implements UserRepositoryInterface {

    public function find(int $id): ?User
    {
        $query = <<<HEREDOC
                        SELECT 
                            *
                        FROM
                            users A
                        WHERE
                            A.id = :id
                    HEREDOC;

        $parameters = [
            "id" => $id,
        ];

        $result = $this->execute($query, $parameters);

        return $this->primitiveToUser($result[0] ?? null);
    }



    public function findByEmail(string $email): ?User 
    {
        $query = "SELECT * FROM users WHERE email = :email";

        $parameters = [
            "email" => $email,
        ];

        $result = $this->execute($query, $parameters);
        
        $user = $this->primitiveToUser($result[0] ?? null); 

        if (empty($user)) {
            return null;
        }

        return $user;
    }

    public function findByEmailAndPassword(string $email, string $password): ?User
    {
        $user = $this->findByEmail($email);

        if (empty($user)) {
            return null;
        }

        if (password_verify($password, $user->password())) {
            return $user;
        }
        
        return null;
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

    public function insert(User $user): void
    {
        $query = <<<INSERT_QUERY
                    INSERT INTO
                        users
                    (name, email, password, token, token_auth_date)
                        VALUES
                    (:name, :email, :password, :token, :tokenAuthDate)
                INSERT_QUERY;
            
        $parameters = [
            "name" => $user->name(),
            "email" => $user->email(),
            "password" => $user->password(),
            "token" => "",
            "tokenAuthDate" => date('Y-m-d H:i:s', strtotime('+1 day')), // 1 día de expiración
        ];

        $this->execute($query, $parameters);
    }

    public function update(User $user): void
    {
        $query = <<<UPDATE_QUERY
                        UPDATE
                            users
                        SET
                            name = :name,
                            email = :email,
                            password = :password,
                            token = :token,
                            token_auth_date = :tokenAuthDate
                        WHERE
                            id = :id
                    UPDATE_QUERY;

        $parameters = [
            "name" => $user->name(),
            "email" => $user->email(),
            "password" => $user->password(),
            "token" => $user->token(),
            "tokenAuthDate" => $user->tokenAuthDate()->format("Y-m-d H:i:s"),
            "id" => $user->id()
        ];

        $this->execute($query, $parameters);
    }
    public function search(): array
    {
        $query = <<<HEREDOC
                        SELECT
                            *
                        FROM
                            users A 

                    HEREDOC;
        
        $results = $this->execute($query);

        $users = [];
        foreach($results as $result) {
            $users[] = $this->primitiveToUser($result);
        }

        return $users;
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
            !empty($primitive["token_auth_date"]) ? new DateTime($primitive["token_auth_date"]) : null,
            $primitive["role"] ?? 'user',
        );
    }

    public function delete(int $id): void
    {
        $query = <<<DELETE_QUERY
                        DELETE FROM
                            users
                        WHERE
                            id = :id
                    DELETE_QUERY;

        $parameters = [
            "id" => $id,
        ];

        $this->execute($query, $parameters);
    }
}