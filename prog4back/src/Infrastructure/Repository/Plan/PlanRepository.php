<?php 

namespace Src\Infrastructure\Repository\Plan;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\Plan\Plan;

final readonly class PlanRepository extends PDOManager implements PlanRepositoryInterface {

    public function find(int $id): ?Plan
    {
        $query = <<<SQL
            SELECT *
            FROM plans
            WHERE id = :id AND deleted = 0
        SQL;

        $parameters = ["id" => $id];

        $result = $this->execute($query, $parameters);

        return $this->toPlan($result[0] ?? null);
    }

    /** @return Plan[] */
    public function search(): array
    {
        $query = "SELECT id, name, description, price FROM plans WHERE deleted = 0";
        $results = $this->execute($query);

        $plans = [];
        foreach ($results as $result) {
            $plans[] = $this->toPlan($result);
        }

        return $plans;
    }


    public function create(Plan $plan): void
    {
        $query = <<<SQL
            INSERT INTO plans (name, description, price, deleted)
            VALUES (:name, :description, :price, 0)
        SQL;

        $parameters = [
            "name" => $plan->name(),
            "description" => $plan->description(),
            "price" => $plan->price(),
        ];

        $this->execute($query, $parameters);
    }

    public function update(Plan $plan): void
    {
        $query = <<<SQL
            UPDATE plans
            SET name = :name, 
                description = :description, 
                price = :price
                
            WHERE id = :id
        SQL;

        $parameters = [
            "id" => $plan->id(),
            "name" => $plan->name(),
            "description" => $plan->description(),
            "price" => $plan->price(),
            
        ];

        $this->execute($query, $parameters);
    }


    public function delete(Plan $plan): void
    {
        // Delete lógico
        $query = "UPDATE plans SET deleted = 1 WHERE id = :id";
        $parameters = ["id" => $plan->id()];

        $this->execute($query, $parameters);
    }

    public function softDelete(int $id): void
{
    $query = "UPDATE plans SET deleted = 1 WHERE id = :id";
    $parameters = ["id" => $id];
    $this->execute($query, $parameters);
}


    private function toPlan(?array $row): ?Plan
    {
        if ($row === null) return null;

        return new Plan(
            $row["id"],
            $row["name"],
            $row["description"],
            $row["price"]
            
        );
    }
}
