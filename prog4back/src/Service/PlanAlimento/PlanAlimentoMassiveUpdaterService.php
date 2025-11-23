<?php

namespace Src\Service\PlanAlimento;

use Src\Entity\PlanAlimento\PlanAlimento;
use Src\Infrastructure\Repository\PlanAlimento\PlanAlimentoRepository;
use Src\Service\PlanAlimento\PlanAlimentoFinderService;
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
        // Intentar limpiar los existentes, loggear si falla pero continuar
        try {
            $this->repository->deleteAllByPlansUserId($plansUserId);
        } catch (\Throwable $e) {
            ControllerUtils::logAction(
                "Error al eliminar PlanAlimento(s) existentes para plansUserId={$plansUserId}: " . $e->getMessage(),
                true,
                3
            );
            // seguir intentando recrear los items
        }

        $created = 0;

        foreach ($items as $index => $item) {
            // Cada item debe traer descripcion, tipo y dia
            if (!isset($item["descripcion"], $item["tipo"], $item["dia"])) {
                ControllerUtils::logAction(
                    "PlanAlimento saltado (datos incompletos) en índice {$index} para plansUserId={$plansUserId}",
                    true,
                    2
                );
                continue;
            }

            $plan = PlanAlimento::create(
                $item["descripcion"],
                $item["tipo"],
                $item["dia"],
                $plansUserId
            );

            try {
                $this->repository->create($plan);
                $created++;
            } catch (\Throwable $e) {
                ControllerUtils::logAction(
                    "Error al crear PlanAlimento (index={$index}) para plansUserId={$plansUserId}: " . $e->getMessage(),
                    true,
                    3
                );
                // continuar con los demás items
            }
        }

        if ($created > 0) {
            ControllerUtils::logAction(
                "Se actualizaron {$created} PlanAlimento(s) para plansUserId={$plansUserId}.",
                false
                
            );
        } else {
            ControllerUtils::logAction(
                "No se crearon PlanAlimento(s) para plansUserId={$plansUserId}.",
                true,
                2
            );
        }
    }
}
