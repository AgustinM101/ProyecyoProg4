<?php 

namespace Src\Infrastructure\Repository\PlanEjercicio;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\PlanEjercicio\PlanEjercicio;

final readonly class PlanEjercicioRepository extends PDOManager implements PlanEjercicioRepositoryInterface 
{
    public function find(int $id): ?PlanEjercicio {
        $query = <<<HEREDOC
            SELECT id, name, description, tipo
            FROM plan_ejercicios
            WHERE id = :id AND deleted = 0
            LIMIT 1
        HEREDOC;

        $parameters = [ "id" => $id ];
        $results = $this->execute($query, $parameters);

        return isset($results[0]) ? $this->toPlanEjercicio($results[0]) : null;
    }

    public function search(): array {
        $query = "SELECT id, name, description, tipo FROM plan_ejercicios WHERE deleted = 0";
        $results = $this->execute($query);

        $planEjercicios = [];
        foreach ($results as $result) {
            $planEjercicios[] = $this->toPlanEjercicio($result);
        }

        return $planEjercicios;
    }

        public function findByPlanUser(int $id): array {
        // Busca todos los ejercicio asociados al plan del usuario con la columna "plans_user_id = $id"
        $query = <<<HEREDOC
            SELECT * FROM
                plan_ejercicios
            WHERE
                plans_user_id = :id AND deleted = 0
        HEREDOC;

        $parameters = [ "id" => $id ];
        $results = $this->execute($query, $parameters);

        $planEjercicio = [];
        foreach($results as $result) {
            $planEjercicio
            [] = $this->toPlanEjercicio($result);
        }

        return $planEjercicio;
    }

    public function create(PlanEjercicio $planEjercicio): PlanEjercicio {
        $query = <<<INSERT_QUERY
            INSERT INTO plan_ejercicios (name, description, tipo, deleted)
            VALUES (:name, :description, :tipo, 0)
        INSERT_QUERY;

        $parameters = [
            "name" => $planEjercicio->name(),
            "description" => $planEjercicio->description(),
            "tipo" => $planEjercicio->tipo()
        ];

        $this->execute($query, $parameters);

        // ✅ recuperar el último ID insertado
        $id = $this->lastInsertId();

        return new PlanEjercicio(
            (int) $id,
            $planEjercicio->name(),
            $planEjercicio->description(),
            $planEjercicio->tipo()
        );
    }

    public function update(PlanEjercicio $planEjercicio): void {
        $query = <<<UPDATE_QUERY
            UPDATE plan_ejercicios
            SET name = :name, description = :description, tipo = :tipo
            WHERE id = :id AND deleted = 0
        UPDATE_QUERY;

        $parameters = [
            "id" => $planEjercicio->id(),
            "name" => $planEjercicio->name(),
            "description" => $planEjercicio->description(),
            "tipo" => $planEjercicio->tipo(),
        ];

        $this->execute($query, $parameters);
    }

    public function delete(int $id): void {
        $query = "UPDATE plan_ejercicios SET deleted = 1 WHERE id = :id";
        $parameters = [ "id" => $id ];
        $this->execute($query, $parameters);
    }

    private function toPlanEjercicio(?array $primitive): ?PlanEjercicio {
        if ($primitive === null) {
            return null;
        }

        return new PlanEjercicio(
            $primitive["id"],
            $primitive["name"],
            $primitive["description"],
            $primitive["tipo"]
        );
    }
}
