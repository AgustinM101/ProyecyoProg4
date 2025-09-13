<?php 

namespace Src\Infrastructure\Repository\Plan;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\Plan\Plan;

final readonly class PlanRepository extends PDOManager implements PlanRepositoryInterface {
    public function find(int $id): ?Plan
    {
        $query = <<<HEREDOC
                        SELECT 
                            *
                        FROM
                            plans A
                        WHERE
                            A.id = :id
                    HEREDOC;

        $parameters = [
            "id" => $id,
        ];

        $result = $this->execute($query, $parameters);

        return $this->toPlan($result[0] ?? null);
    }

    /** @return Plan[] */
    public function search(): array
    {
        $query = <<<HEREDOC
                        SELECT
                            *
                        FROM
                            plans A
                    HEREDOC;
        
        $results = $this->execute($query);

        $plans = [];
        foreach($results as $result) {
            $plans[] = $this->toPlan($result);
        }

        return $plans;
    }
    public function create(Plan $plan): void{



        $query = <<< INSERT_QUERY
                        INSERT INTO plans (name, description, price)
                        VALUES (:name, :description, :price)
                        INSERT_QUERY;
        
        $parameters = [
            "name" => $plan->name(),
            "description" => $plan->description(),
            "price" => $plan->price(),
        ];

        $this->execute($query, $parameters);
    }
    public function delete(Plan $plan): void
    {
        $query = <<< DELETE_QUERY
                        DELETE FROM plans
                        WHERE id = :id
                        DELETE_QUERY;

        $parameters = [
            "id" => $plan->id(),
        ];

        $this->execute($query, $parameters);
    }

    public function update(Plan $plan): void
    {
        $query = <<< UPDATE_QUERY
                        UPDATE plans
                        SET name = :name, description = :description, price = :price
                        WHERE id = :id
                        UPDATE_QUERY;

        $parameters = [
            "id" => $plan->id(),
            "name" => $plan->name(),
            "description" => $plan->description(),
            "price" => $plan->price(),
        ];

        $this->execute($query, $parameters);
    }
    private function toPlan(?array $primitive): ?Plan {
        if ($primitive === null) {
            return null;
        }

        return new Plan(
            $primitive["id"],
            $primitive["name"],
            $primitive["description"],
            $primitive["price"]
        );

    }
}