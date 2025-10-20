<?php

namespace Src\Service\PlanAlimento;

use Src\Infrastructure\Repository\PlanAlimento\PlanAlimentoRepository;

final readonly class PlanAlimentoUserFinderService
{
    private PlanAlimentoRepository $repository;

    public function __construct() {
        $this->repository = new PlanAlimentoRepository();
    }

    /**
     * Devuelve todos los alimentos asociados a un usuario
     */
    public function findByPlanUser(int $userId): array
    {
        $query = <<<SQL
            SELECT pa.id, pa.name, pa.description, pa.tipo
            FROM plan_alimentos pa
            INNER JOIN plan_alimentos_user pau ON pau.plan_alimento_id = pa.id
            WHERE pau.plans_user_id = :userId AND pa.deleted = 0
        SQL;

        $parameters = ["userId" => $userId];
        $results = $this->repository->execute($query, $parameters);

        $alimentos = [];
        foreach ($results as $row) {
            $alimentos[] = [
                "id" => $row["id"],
                "name" => $row["name"],
                "description" => $row["description"],
                "tipo" => $row["tipo"]
            ];
        }

        return $alimentos;
    }
}
