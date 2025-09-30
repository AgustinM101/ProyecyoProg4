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
                up.status
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

    /** @return array[] */
    public function searchPlansWithDetails(): array {
        $query = <<<SQL
            SELECT 
                up.id_user,
                u.name AS user_name,
                u.email AS user_email,
                up.id_plan,
                p.name AS plan_name,
                up.status
            FROM plans_user up
            JOIN users u ON u.id = up.id_user
            JOIN plans p ON p.id = up.id_plan
        SQL;

        return $this->execute($query);
    }

    /** @return array[] */
    public function findByUserIdWithDetails(int $id_user): array {
        $query = <<<SQL
            SELECT 
                up.id_user,
                u.name AS user_name,
                u.email AS user_email,
                up.id_plan,
                p.name AS plan_name,
                up.status
            FROM plans_user up
            JOIN users u ON u.id = up.id_user
            JOIN plans p ON p.id = up.id_plan
            WHERE up.id_user = :id_user
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

    /** @return PlansUser[] */
    public function findByUserId(int $id_user): array {
        $query = <<<SQL
            SELECT id_user, id_plan, status
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
            INSERT INTO plans_user (id_user, id_plan, status)
            VALUES (:id_user, :id_plan, :status)
        SQL;

        $parameters = [
            "id_user" => $plan->id_user(),
            "id_plan" => $plan->id_plan(),
            "status" => $plan->status()
        ];

        $this->execute($parameters, $query);
    }

    public function removePlan(int $id_user, int $id_plan): void {
        $query = <<<SQL
            DELETE FROM plans_user
            WHERE id_user = :id_user AND id_plan = :id_plan
        SQL;

        $parameters = [
            "id_user" => $id_user,
            "id_plan" => $id_plan
        ];

        $this->execute($parameters, $query);
    }

    private function toPlansUser(?array $row): ?PlansUser {
        if ($row === null) return null;

        return new PlansUser(
            null, // id si no está en la tabla
            $row["id_user"],
            $row["id_plan"],
            $row["status"]
        );
    }
}
