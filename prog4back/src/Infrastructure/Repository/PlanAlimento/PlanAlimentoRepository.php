<?php 

namespace Src\Infrastructure\Repository\PlanAlimento;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\PlanAlimento\PlanAlimento;

final readonly class PlanAlimentoRepository extends PDOManager implements PlanAlimentoRepositoryInterface {
    public function find(int $id): ?PlanAlimento
    {
        $query = <<<HEREDOC
                        SELECT 
                            *
                        FROM
                            plan_alimento A
                        WHERE
                            A.id = :id
                    HEREDOC;

        $parameters = [
            "id" => $id,
        ];

        $result = $this->execute($query, $parameters);

        return $this->toPlanAlimento($result[0] ?? null);
    }

    /** @return PlanAlimento[] */
    public function search(): array
    {
        $query = <<<HEREDOC
                        SELECT
                            *
                        FROM
                            plan_alimento A
                    HEREDOC;
        
        $results = $this->execute($query);

        $planAlimentos = [];
        foreach($results as $result) {
            $planAlimentos[] = $this->toPlanAlimento($result);
        }

        return $planAlimentos;
    }
    public function create(PlanAlimento $planAlimento): void{



        $query = <<< INSERT_QUERY
                        INSERT INTO plan_alimento (name, description, tipo, deleted)
                        VALUES (:name, :description, :tipo, :deleted)
                        INSERT_QUERY;
        
        $parameters = [
            "name" => $planAlimento->name(),
            "description" => $planAlimento->description(),
            "tipo" => $planAlimento->tipo(),
            "deleted" => $planAlimento->deleted(),
        ];
    

        $this->execute($query, $parameters);
    }
    public function update(PlanAlimento $planAlimento): void
    {
        $query = <<< UPDATE_QUERY
                        UPDATE plan_alimento
                        SET name = :name, description = :description, tipo = :tipo, deleted = :deleted
                        WHERE id = :id
                        UPDATE_QUERY;

        $parameters = [
            "id" => $planAlimento->id(),
            "name" => $planAlimento->name(),
            "description" => $planAlimento->description(),
            "tipo" => $planAlimento->tipo(),
            "deleted" => $planAlimento->deleted(),
        ];

        $this->execute($query, $parameters);
    }
    private function toPlanAlimento(?array $primitive): ?PlanAlimento {
        if ($primitive === null) {
            return null;
        }

        return new PlanAlimento(
            $primitive["id"],
            $primitive["name"],
            $primitive["description"],
            $primitive["tipo"],
            $primitive["deleted"],
        );
    }
}