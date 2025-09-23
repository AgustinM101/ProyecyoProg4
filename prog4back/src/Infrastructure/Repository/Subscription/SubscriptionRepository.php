<?php

namespace Src\Infrastructure\Repository\Suscription;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\Suscription\Suscription;

final readonly class SuscriptionRepository extends PDOManager implements SuscriptionRepositoryInterface {

    /** @return Suscription[] */
    public function search(): array {
        $query = <<<SQL
            SELECT id_user, id_plan, status
            FROM plans_user
        SQL;

        $results = $this->execute($query);

        $plansUsers = [];
        foreach ($results as $row) {
            $plansUsers[] = $this->toPlansUser($row);
        }

        return $plansUsers;
    }

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