<?php 

namespace Src\Infrastructure\Repository\PlanAlimento;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\PlanAlimento\PlanAlimento;

final readonly class PlanAlimentoRepository extends PDOManager implements PlanAlimentoRepositoryInterface 
{
    public function findByPlanUser(int $id): array {
        // Busca todos los alimentos asociados al plan del usuario con la columna "plans_user_id = $id"
        $query = <<<HEREDOC
            SELECT * FROM
                plan_alimentos
            WHERE
                plans_user_id = :id AND deleted = 0
        HEREDOC;

        $parameters = [ "id" => $id ];
        $results = $this->execute($query, $parameters);

        $planAlimentos = [];
        foreach($results as $result) {
            $planAlimentos[] = $this->toPlanAlimento($result);
        }

        return $planAlimentos;
    }

    // Buscar un PlanAlimento por ID
    public function find(int $id): ?PlanAlimento
    {
        $query = <<<HEREDOC
            SELECT 
                id, name, description, tipo
            FROM
                plan_alimentos A
            WHERE
                A.id = :id AND deleted = 0
        HEREDOC;

        $parameters = [ "id" => $id ];
        $results = $this->execute($query, $parameters);

        $planAlimentos = [];
        foreach($results as $result) {
            $planAlimentos[] = $this->toPlanAlimento($result);
        }

        return $planAlimentos[0] ?? null;
    }

    // Buscar todos los PlanAlimentos
    public function search(): array
    {
        $query = "SELECT id, name, description, tipo FROM plan_alimentos WHERE deleted = 0";
        $results = $this->execute($query);
        

        $planAlimentos = [];
        foreach ($results as $result) {
            $planAlimentos[] = $this->toPlanAlimento($result);
        }

        return $planAlimentos;
    }

    // Crear un nuevo PlanAlimento
    public function create(PlanAlimento $PlanAlimento): void
    {
        $query = <<<INSERT_QUERY
            INSERT INTO plan_alimentos (name, description, tipo)
            VALUES (:name, :description, :tipo)
        INSERT_QUERY;

        $parameters = [
            "name" => $PlanAlimento->name(),
            "description" => $PlanAlimento->description(),
            "tipo" => $PlanAlimento->tipo()
        ];

        $this->execute($query, $parameters);
    }

    // Actualizar un PlanAlimento existente
    public function update(PlanAlimento $PlanAlimento): void
    {
        $query = <<<UPDATE_QUERY
            UPDATE plan_alimentos
            SET name = :name, description = :description, tipo = :tipo
            WHERE id = :id
        UPDATE_QUERY;

        $parameters = [
            "id" => $PlanAlimento->id(),
            "name" => $PlanAlimento->name(),
            "description" => $PlanAlimento->description(),
            "tipo" => $PlanAlimento->tipo(),
        ];

        $this->execute($query, $parameters);
    }

     public function delete(int $id): void
    {
        $query = "DELETE FROM plan_alimentos WHERE id = :id";
        $parameters = [ "id" => $id ];
        $this->execute($query, $parameters);
    }
    // Mapea un array de la DB a un objeto PlanAlimento
    private function toPlanAlimento(?array $primitive): ?PlanAlimento
    {
        if ($primitive === null) {
            return null;
        }
        
        return new PlanAlimento(
            $primitive["id"],
            $primitive["name"],
            $primitive["description"],
            $primitive["tipo"]
        );
    }
    
}