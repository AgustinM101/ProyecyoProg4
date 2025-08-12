<?php 

namespace Src\Infrastructure\Repository\User;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\User\User;

final readonly class UserRepository extends PDOManager implements UserRepositoryInterface {
    public function findByEmailAndPassword(string $email, string $password): ?User
    {
        $query = <<<HEREDOC
                        SELECT 
                            *
                        FROM
                            users U
                        WHERE
                            U.email = :email
                            AND U.password = :password
                    HEREDOC;

        $parameters = [
            "email" => $email,
            "password" => $password,
        ];

        $result = $this->execute($query, $parameters);

        return $this->toUser($result[0] ?? null);
    }
    public function findByToken(string $token): ?User
    {
        $query = <<<HEREDOC
                        SELECT 
                            *
                        FROM
                            users U
                        WHERE
                            U.token = :token
                            AND :date <= :token_expiration_date

                    HEREDOC;

        $parameters = [
            "token" => $token,
            "date" => date("Y-m-d H:i:s"),
        ];

        $result = $this->execute($query, $parameters);

        return $this->toUser($result[0] ?? null);
    }

    /** @return User[] */
    

    public function update(User $user): void
    {
        $query = <<< UPDATE_QUERY
                        UPDATE users
                        SET name = :name, email = :email, password = :password, token = :token, token_expiration_date = :token_expiration_date
                        WHERE id = :id
                        UPDATE_QUERY;

        $parameters = [
            "id" => $user->id(),
            "name" => $user->name(),
            "email" => $user->email(),
            "password" => $user->password(),
            "token" => $user-> token(),
            "token_expiration_date" => $user-> tokenExpirationDate(),
        ];

        $this->execute($query, $parameters);
    }   
    private function toUser(?array $primitive): ?User {
        if ($primitive === null) {
            return null;
        }

        return new User(
            $primitive["id"],
            $primitive["name"],
            $primitive["email"],
            $primitive["password"],
            $primitive["token"],
            $primitive["token_expiration_date"]

        );
    }
}