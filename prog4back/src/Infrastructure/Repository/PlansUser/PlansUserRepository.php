<?php

namespace Src\Infrastructure\Repository\PlansUser;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\PlansUser\PlansUser;

final readonly class PlansUserRepository extends PDOManager implements PlansUserRepositoryInterface {

    /** @return PlansUser[] */
    public function searchPlans(): array {
        $query = <<<SQL
            SELECT 
                up.id_user,
                up.id_plan,
                up.status,
                up.expiration_date
            FROM plans_user up
            JOIN users u ON u.id = up.id_user
            JOIN plans p ON p.id = up.id_plan
        SQL;

        $results = $this->execute($query);

        $plansUsers = [];
        foreach ($results as $row) {
            $plansUsers[] = $this->toPlansUser($row);
        }

        return $plansUsers;
    }

    public function findById(int $id): ?PlansUser {
    $query = "SELECT id, id_user, id_plan, status, expiration_date 
              FROM plans_user 
              WHERE id = :id";
    $result = $this->execute($query, ["id" => $id]);
    return !empty($result) ? $this->toPlansUser($result[0]) : null;
}



    /** @return array[] */
    public function searchPlansWithDetails(): array {
        $query = <<<SQL
            SELECT 
                up.id,
                up.id_user,
                u.name AS user_name,
                u.email AS user_email,
                up.id_plan,
                p.name AS plan_name,
                up.status,
                up.expiration_date
            FROM plans_user up
            JOIN users u ON u.id = up.id_user
            JOIN plans p ON p.id = up.id_plan
            WHERE up.deleted = 0
        SQL;

        return $this->execute($query);
    }

    /** @return array[] */
    public function findByUserIdWithDetails(int $id_user): array {
        $query = <<<SQL
            SELECT 
                up.id,
                up.id_user,
                u.name AS user_name,
                u.email AS user_email,
                up.id_plan,
                p.name AS plan_name,
                up.status,
                up.expiration_date
            FROM plans_user up
            JOIN users u ON u.id = up.id_user
            JOIN plans p ON p.id = up.id_plan
            WHERE up.id_user = :id_user
            AND up.deleted = 0
        SQL;

        $params = ["id_user" => $id_user];
        return $this->execute($query, $params);
    }

    // Métodos requeridos por la interfaz
    public function findAllWithDetails(): array {
        return $this->searchPlansWithDetails();
    }

    public function findByUserWithDetails(int $id_user): array {
        return $this->findByUserIdWithDetails($id_user);
    }

    public function delete(int $id): void {
        $query = "DELETE FROM plans_users WHERE id = :id";
        $parameters = ["id" => $id];

        $this->execute($query, $parameters); // usa el método execute que ya maneja la conexión
    }



    /** @return PlansUser[] */
    public function findByUserId(int $id_user): array {
        $query = <<<SQL
            SELECT id, id_user, id_plan, status, expiration_date
            FROM plans_user
            WHERE id_user = :id_user
        SQL;

        $parameters = ["id_user" => $id_user];
        $results = $this->execute($query, $parameters);

        $plansUsers = [];
        foreach ($results as $row) {
            $plansUsers[] = $this->toPlansUser($row);
        }

        return $plansUsers;
    }



    public function assignPlan(PlansUser $plan): void {
        $query = <<<SQL
            INSERT INTO plans_user (id_user, id_plan, status, expiration_date)
            VALUES (:id_user, :id_plan, :status, :expiration_date)
        SQL;

        $parameters = [
            "id_user" => $plan->id_user(),
            "id_plan" => $plan->id_plan(),
            "status" => $plan->status(),
            "expiration_date" => $plan->expiration_date()
        ];

        $this->execute($query, $parameters);
    }


    public function updateStatusAndExpirationById(int $id, string $status, string $expiration_date): void {
    $query = <<<SQL
        UPDATE plans_user
        SET status = :status,
            expiration_date = :expiration_date
        WHERE id = :id
    SQL;

    $params = [
        "id" => $id,
        "status" => $status,
        "expiration_date" => $expiration_date
    ];

    $this->execute($query, $params);
}


public function removePlanById(int $id): void {
    $query = "DELETE FROM plans_user WHERE id = :id";
    $params = ["id" => $id];
    $this->execute($query, $params);
}

public function markAsDeleted(int $id): void {
    $query = "UPDATE plans_user SET deleted = 1 WHERE id = :id";
    $params = ["id" => $id];
    $this->execute($query, $params);
}




private function toPlansUser(?array $row): ?PlansUser {
    if ($row === null) return null;

    return new PlansUser(
        $row["id"] ?? null,
        $row["id_user"],
        $row["id_plan"],
        $row["status"],
        $row["expiration_date"] 
    );
}


}