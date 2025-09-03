<?php 

namespace Src\Infrastructure\Repository\Brand;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\PlanEjercicio\PlanEjercicio;

final readonly class PlanEjercicioRepository extends PDOManager implements PlanEjercicioRepositoryInterface {
    public function find(int $id): ?PlanEjercicio
    {
        $query = <<<HEREDOC
                        SELECT 
                            *
                        FROM
                            plan_ejercicio A
                        WHERE
                            A.id = :id
                    HEREDOC;

        $parameters = [
            "id" => $id,
        ];

        $result = $this->execute($query, $parameters);

        return $this->toPlanEjercicio($result[0] ?? null);
    }

    /** @return PlanEjercicio[] */
    public function search(): array
    {
        $query = <<<HEREDOC
                        SELECT
                            *
                        FROM
                            plan_ejercicio A
                    HEREDOC;
        
        $results = $this->execute($query);

        $planEjercicios = [];
        foreach($results as $result) {
            $planEjercicios[] = $this->toPlanEjercicio($result);
        }

        return $planEjercicios;
    }
    public function create(PlanEjercicio $planEjercicio): void{



        $query = <<< INSERT_QUERY
                        INSERT INTO plan_ejercicio (name, duration_valor, duration_unidad, tipo, description, deleted)
                        VALUES (:name, :duration_valor, :duration_unidad, :tipo, :description, :deleted)
                        INSERT_QUERY;
        
        $parameters = [
            "name" => $planEjercicio->name(),
            "duration_valor" => $planEjercicio->durationValor(),
            "duration_unidad" => $planEjercicio->durationUnidad(),
            "tipo" => $planEjercicio->tipo(),
            "description" => $planEjercicio->description(),
            "deleted" => $planEjercicio->deleted(),
        ];
    

        $this->execute($query, $parameters);
    }
    public function update(PlanEjercicio $planEjercicio): void
    {
        $query = <<< UPDATE_QUERY
                        UPDATE plan_ejercicio
                        SET name = :name, duration_valor = :duration_valor, duration_unidad = :duration_unidad, tipo = :tipo, description = :description, deleted = :deleted
                        WHERE id = :id
                        UPDATE_QUERY;

        $parameters = [
            "id" => $planEjercicio->id(),
            "name" => $planEjercicio->name(),
            "duration_valor" => $planEjercicio->durationValor(),
            "duration_unidad" => $planEjercicio->durationUnidad(),
            "tipo" => $planEjercicio->tipo(),
            "description" => $planEjercicio->description(),
            "deleted" => $planEjercicio->deleted(),
        ];

        $this->execute($query, $parameters);
    }
    private function toPlanEjercicio(?array $primitive): ?PlanEjercicio {
        if ($primitive === null) {
            return null;
        }

        return new PlanEjercicio(
            $primitive["id"],
            $primitive["name"],
            $primitive["duration_valor"],
            $primitive["duration_unidad"],
            $primitive["tipo"],
            $primitive["description"],
            $primitive["deleted"],
        );
    }
}