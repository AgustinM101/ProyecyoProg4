<?php

namespace Src\Service\PlanEjercicio;

use Src\Infrastructure\Repository\PlanEjercicio\PlanEjercicioRepository;

final readonly class PlanEjercicioUserFinderService
{
    private PlanEjercicioRepository $repository;

    public function __construct() {
        $this->repository = new PlanEjercicioRepository();
    }

    /**
     * Devuelve todos los ejercicios asociados a un usuario
     */
    public function findByPlanUser(int $userId): array
    {
        $query = <<<SQL
            SELECT pe.id, pe.name, pe.description, pe.tipo
            FROM plan_ejercicios pe
            INNER JOIN plan_ejercicios_user peu ON peu.plan_ejercicio_id = pe.id
            WHERE peu.plans_user_id = :userId AND pe.deleted = 0
        SQL;

        $parameters = ["userId" => $userId];
        $results = $this->repository->execute($query, $parameters);

        $exercises = [];
        foreach ($results as $row) {
            $exercises[] = [
                "id" => $row["id"],
                "name" => $row["name"],
                "description" => $row["description"],
                "tipo" => $row["tipo"]
            ];
        }

        return $exercises;
    }
}
