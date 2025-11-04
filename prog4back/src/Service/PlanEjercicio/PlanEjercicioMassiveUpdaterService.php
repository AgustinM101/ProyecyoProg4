<?php

namespace Src\Service\PlanEjercicio;

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
        foreach ($items as $item) {

            if (!isset($item["id"], $item["descripcion"], $item["tipo"], $item["dia"])) {
                continue;
            }

            $plan = $this->finder->find($item["id"]);

            // seguridad: solo actualiza si pertenece al usuario
            if ($plan->idPlansUser() !== $plansUserId) {
                continue;
            }

            $plan->modify(
                $item["descripcion"],
                $item["tipo"],
                $item["dia"]
            );

            $this->repository->updateForUser($plan);
        }
    }
}
