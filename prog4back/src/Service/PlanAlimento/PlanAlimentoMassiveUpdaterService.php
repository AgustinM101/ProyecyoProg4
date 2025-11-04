<?php

namespace Src\Service\PlanAlimento;

use Src\Infrastructure\Repository\PlanAlimento\PlanAlimentoRepository;
use Src\Utils\ControllerUtils;

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
            ControllerUtils::logAction("Intento de modificar un plan de alimento que no pertenece al usuario del plan: PlanAlimento ID {$item['id']}, PlansUser ID {$plansUserId}", true, 2);
        }

        $plan->modify(
            $item["descripcion"],
            $item["tipo"],
            $item["dia"]
        );
        ControllerUtils::logAction("Se modificó el plan de alimento ID {$item['id']} del PlansUser ID {$plansUserId}", false);

        $this->repository->update($plan);
    }
}

}
