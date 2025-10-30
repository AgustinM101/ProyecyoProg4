<?php

namespace Src\Service\PlanEjercicio;

use Src\Entity\PlanEjercicio\PlanEjercicio;
use Src\Infrastructure\Repository\PlanEjercicio\PlanEjercicioRepository;

final readonly class PlanEjercicioMassiveCreatorService
{
    private PlanEjercicioRepository $repository;

    public function __construct()
    {
        $this->repository = new PlanEjercicioRepository();
    }

    public function createAll(int $plansUserId, array $items): void
    {
        foreach ($items as $item) {
            // Cada item debe traer descripcion, tipo y dia
            if (!isset($item["descripcion"], $item["tipo"], $item["dia"])) {
                continue;
            }

            $plan = PlanEjercicio::create(
                $item["descripcion"],
                $item["tipo"],
                $item["dia"],
                $plansUserId
            );

            $this->repository->createForUser($plan);
        }
    }
}
