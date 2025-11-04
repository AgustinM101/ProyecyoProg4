<?php

namespace Src\Service\PlanEjercicio;

use Src\Entity\PlanEjercicio\PlanEjercicio;
use Src\Infrastructure\Repository\PlanEjercicio\PlanEjercicioRepository;
use Src\Service\PlanEjercicio\PlanEjercicioFinderService;

final readonly class PlanEjercicioMassiveUpdaterService
{
    private PlanEjercicioRepository $repository;
    private PlanEjercicioFinderService $finder;

    public function __construct()
    {
        $this->repository = new PlanEjercicioRepository();
        $this->finder = new PlanEjercicioFinderService();
    }

    public function updateAll(int $plansUserId, array $items): void
    {
        $this->repository->deleteAllByPlansUserId($plansUserId);

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
