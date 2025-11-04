<?php

namespace Src\Service\PlanAlimento;

use Src\Entity\PlanAlimento\PlanAlimento;
use Src\Infrastructure\Repository\PlanAlimento\PlanAlimentoRepository;
use Src\Utils\ControllerUtils;

final readonly class PlanAlimentoMassiveCreatorService
{
    private PlanAlimentoRepository $repository;

    public function __construct()
    {
        $this->repository = new PlanAlimentoRepository();
    }

    public function createAll(int $plansUserId, array $items): void
    {
        foreach ($items as $item) {
            // Cada item debe traer descripción, tipo y dia
            if (!isset($item["descripcion"], $item["tipo"], $item["dia"])) {
                continue; // opcional: acumular errores
                ControllerUtils::logAction("Intento de crear un plan de alimento con datos incompletos para PlansUser ID {$plansUserId}", true, 2);
            }

            $plan = PlanAlimento::create(
                $item["descripcion"],
                $item["tipo"],
                $item["dia"],
                $plansUserId
            );

            ControllerUtils::logAction("Se creó un nuevo plan de alimento para PlansUser ID {$plansUserId}: Descripción '{$item['descripcion']}', Tipo '{$item['tipo']}', Día '{$item['dia']}'", false);
            $this->repository->create($plan);
        }
    }
}
