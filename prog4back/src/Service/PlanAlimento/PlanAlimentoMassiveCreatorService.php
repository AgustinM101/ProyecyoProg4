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
        $created = 0;

        foreach ($items as $index => $item) {
            // Cada item debe traer descripción, tipo y dia
            if (!isset($item["descripcion"], $item["tipo"], $item["dia"])) {
                // warning -> severity 2: payload incompleto, se saltea el item pero se registra
                ControllerUtils::logAction(
                    "PlanAlimento saltado (datos incompletos) en índice {$index} para plansUserId={$plansUserId}",
                    true,
                    2
                );
                continue; // opcional: acumular errores
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
                // error crítico al crear un item -> severity 3
                ControllerUtils::logAction(
                    "Error al crear PlanAlimento (index={$index}) para plansUserId={$plansUserId}: " . $e->getMessage(),
                    true,
                    3
                );
                // continuar con los demás items
            }
        }

        if ($created > 0) {
            // actividad informativa -> severity 1
            ControllerUtils::logAction(
                "Se crearon {$created} PlanAlimento(s) para plansUserId={$plansUserId}.",
                false
                
            );
        }
    }
}
