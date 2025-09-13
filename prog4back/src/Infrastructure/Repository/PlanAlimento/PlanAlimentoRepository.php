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
                            planAlimentos A
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
                            planAlimentos A
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
                        INSERT INTO planAlimento (name, description, tipo)
                        VALUES (:name, :description, :tipo)
                        INSERT_QUERY;
        
        $parameters = [
            "name" => $planAlimento->name(),
            "description" => $planAlimento->description(),
            "tipo" => $planAlimento->tipo(),
            
        ];
    

        $this->execute($query, $parameters);
    }
    public function update(PlanAlimento $planAlimento): void
    {
        $query = <<< UPDATE_QUERY
                        UPDATE planAlimentos
                        SET name = :name, description = :description, tipo = :tipo
                        WHERE id = :id
                        UPDATE_QUERY;

        $parameters = [
            "id" => $planAlimento->id(),
            "name" => $planAlimento->name(),
            "description" => $planAlimento->description(),
            "tipo" => $planAlimento->tipo(),
            
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
            
        );
    }
}