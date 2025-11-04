<?php

namespace Src\Service\PlanAlimento;

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
    foreach ($items as $item) {

        if (!isset($item["id"], $item["descripcion"], $item["tipo"], $item["dia"])) {
            continue;
        }

        $plan = $this->finder->find($item["id"]);

        if ($plan->idPlansUser() !== $plansUserId) {
            continue;
        }

        $plan->modify(
            $item["descripcion"],
            $item["tipo"],
            $item["dia"]
        );

        $this->repository->update($plan);
    }
}

}
