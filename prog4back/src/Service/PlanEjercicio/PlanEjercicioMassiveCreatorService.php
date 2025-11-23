<?php

namespace Src\Service\PlanEjercicio;

use Src\Entity\PlanEjercicio\PlanEjercicio;
use Src\Infrastructure\Repository\PlanEjercicio\PlanEjercicioRepository;
use Src\Utils\ControllerUtils;

final readonly class PlanEjercicioMassiveCreatorService
{
    private PlanEjercicioRepository $repository;

    public function __construct()
    {
        $this->repository = new PlanEjercicioRepository();
    }

    public function createAll(int $plansUserId, array $items): void
    {
        $created = 0;

        foreach ($items as $index => $item) {
            // Cada item debe traer descripcion, tipo y dia
            if (!isset($item["descripcion"], $item["tipo"], $item["dia"])) {
                // warning -> severity 2: payload incompleto, se saltea el item pero se registra
                ControllerUtils::logAction(
                    "PlanEjercicio saltado (datos incompletos) en índice {$index} para plansUserId={$plansUserId}",
                    true,
                    2
                );
                continue;
            }

            $plan = PlanEjercicio::create(
                $item["descripcion"],
                $item["tipo"],
                $item["dia"],
                $plansUserId
            );

            try {
                $this->repository->createForUser($plan);
                $created++;
            } catch (\Throwable $e) {
                // error crítico al crear un item -> severity 3
                ControllerUtils::logAction(
                    "Error al crear PlanEjercicio (index={$index}) para plansUserId={$plansUserId}: " . $e->getMessage(),
                    true,
                    3
                );
                // no re-lanzar para seguir intentando con los demás items
            }
        }

        if ($created > 0) {
            // actividad informativa -> severity 1
            ControllerUtils::logAction(
                "Se crearon {$created} PlanEjercicio(s) para plansUserId={$plansUserId}.",
                false
                
            );
        }
    }
}
