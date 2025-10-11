<?php 

declare(strict_types = 1);

namespace Src\Infrastructure\Repository\User;

use DateTime;
use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\User\User;
use Src\Entity\Plan\Plan;

final readonly class UserRepository extends PDOManager implements UserRepositoryInterface {

    public function find(int $id): ?User
    {
        $query = "SELECT * FROM users WHERE id = :id";
        $parameters = ["id" => $id];
        $result = $this->execute($query, $parameters);
        return $this->primitiveToUser($result[0] ?? null);
    }

    public function findByEmail(string $email): ?User
    {
        $query = "SELECT * FROM users WHERE email = :email";
        $parameters = ["email" => $email];
        $result = $this->execute($query, $parameters);
        return $this->primitiveToUser($result[0] ?? null);
    }

    public function findByEmailAndPassword(string $email, string $password): ?User
    {
        $user = $this->findByEmail($email);
        if (empty($user)) return null;
        return password_verify($password, $user->password()) ? $user : null;
    }

    public function findByToken(string $token): ?User
    {
        $query = "SELECT * FROM users WHERE token = :token AND :date <= token_auth_date";
        $parameters = [
            "token" => $token,
            "date" => date("Y-m-d H:i:s")
        ];
        $result = $this->execute($query, $parameters);
        return $this->primitiveToUser($result[0] ?? null);
    }

    public function insert(User $user): void
    {
        $query = <<<SQL
            INSERT INTO users
            (name, email, password, phone, profile_image, token, token_auth_date, role, plan_id, deleted)
            VALUES
            (:name, :email, :password, :phone, :profileImage, :token, :tokenAuthDate, :role, :planId, :deleted)
        SQL;

        $parameters = [
            "name" => $user->name(),
            "email" => $user->email(),
            "password" => $user->password(),
            "phone" => $user->phone(),
            "profileImage" => $user->profileImage(),
            "token" => $user->token() ?? "",
            "tokenAuthDate" => $user->tokenAuthDate()?->format("Y-m-d H:i:s") ?? date('Y-m-d H:i:s'),
            "role" => $user->role(),
            "planId" => $user->plan()?->id() ?? null,
            "deleted" => $user->deleted() ?? 0
        ];

        $this->execute($query, $parameters);
    }

    public function update(User $user): void
    {
        $query = <<<SQL
            UPDATE users
            SET name = :name,
                email = :email,
                password = :password,
                phone = :phone,
                profile_image = :profileImage,
                token = :token,
                token_auth_date = :tokenAuthDate,
                role = :role,
                plan_id = :planId,
                deleted = :deleted
            WHERE id = :id
        SQL;

        $parameters = [
            "name" => $user->name(),
            "email" => $user->email(),
            "password" => $user->password(),
            "phone" => $user->phone(),
            "profileImage" => $user->profileImage(),
            "token" => $user->token(),
            "tokenAuthDate" => $user->tokenAuthDate()?->format("Y-m-d H:i:s"),
            "role" => $user->role(),
            "planId" => $user->plan()?->id() ?? null,
            "deleted" => $user->deleted() ?? 0,
            "id" => $user->id()
        ];

        $this->execute($query, $parameters);
    }

    /**
     * ✅ Actualiza solo los datos del perfil (nombre, teléfono e imagen)
     * sin tocar contraseña, token o plan.
     */
    public function updateProfile(int $id, ?string $name, ?string $phone, ?string $profileImage): void
    {
        $query = <<<SQL
            UPDATE users
            SET 
                name = COALESCE(:name, name),
                phone = COALESCE(:phone, phone),
                profile_image = COALESCE(:profileImage, profile_image)
            WHERE id = :id
        SQL;

        $parameters = [
            "id" => $id,
            "name" => $name,
            "phone" => $phone,
            "profileImage" => $profileImage
        ];

        $this->execute($query, $parameters);
    }

    public function search(): array
    {
        $query = "SELECT * FROM users";
        $results = $this->execute($query);
        $users = [];
        foreach($results as $result) {
            $users[] = $this->primitiveToUser($result);
        }
        return $users;
    }

    public function delete(int $id): void
    {
        $query = "DELETE FROM users WHERE id = :id";
        $parameters = ["id" => $id];
        $this->execute($query, $parameters);
    }

    private function primitiveToUser(?array $primitive): ?User
    {
        if ($primitive === null) return null;

        $user = new User(
            $primitive["id"],
            $primitive["name"],
            $primitive["email"],
            $primitive["password"],
            $primitive["phone"] ?? null,
            $primitive["profile_image"] ?? null,
            $primitive["token"] ?? null,
            !empty($primitive["token_auth_date"]) ? new DateTime($primitive["token_auth_date"]) : null,
            $primitive["role"] ?? 'user',
            null // Plan se carga después
        );

        // Cargar plan si existe
        if (!empty($primitive["plan_id"])) {
            $planRepository = new \Src\Infrastructure\Repository\Plan\PlanRepository();
            $plan = $planRepository->find($primitive["plan_id"]);
            $user->setPlan($plan);
        }

        // Asignar deleted
        $user->setDeleted(isset($primitive["deleted"]) ? (int)$primitive["deleted"] : 0);

        return $user;
    }
}




