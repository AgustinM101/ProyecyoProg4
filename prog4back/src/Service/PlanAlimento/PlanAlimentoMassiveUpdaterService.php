<?php

namespace Src\Service\PlanAlimento;

use Src\Entity\PlanAlimento\PlanAlimento;
use Src\Infrastructure\Repository\PlanAlimento\PlanAlimentoRepository;

final readonly class PlanAlimentoMassiveUpdaterService
{
    private PlanAlimentoRepository $repository;
    private PlanAlimentoFinderService $finder;

    public function __construct()
    {
        $this->repository = new PlanAlimentoRepository();
        $this->finder = new PlanAlimentoFinderService();
    }

    public function updateAll(int $plansUserId, array $items): void
{
    $this->repository->deleteAllByPlansUserId($plansUserId);

    foreach ($items as $item) {
        // Cada item debe traer descripción, tipo y dia
        if (!isset($item["descripcion"], $item["tipo"], $item["dia"])) {
            continue; // opcional: acumular errores
        }

        $plan = PlanAlimento::create(
            $item["descripcion"],
            $item["tipo"],
            $item["dia"],
            $plansUserId
        );

        $this->repository->create($plan);
    }
}

}
