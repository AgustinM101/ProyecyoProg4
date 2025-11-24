<?php

namespace Src\Service\PlanEjercicio;

use Src\Entity\PlanEjercicio\PlanEjercicio;
use Src\Infrastructure\Repository\PlanEjercicio\PlanEjercicioRepository;
use Src\Service\PlanEjercicio\PlanEjercicioFinderService;
use Src\Utils\ControllerUtils;

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
        // Intentar limpiar los existentes, loggear si falla pero continuar
        try {
            $this->repository->deleteAllByPlansUserId($plansUserId);
        } catch (\Throwable $e) {
            ControllerUtils::logAction(
                "Error al eliminar PlanEjercicio(s) existentes para plansUserId={$plansUserId}: " . $e->getMessage(),
                true,
                3
            );
            // no re-lanzamos para intentar recrear los items
        }

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
                // seguir con los demás items
            }
        }

        if ($created > 0) {
            // actividad informativa -> severity 1
            ControllerUtils::logAction(
                "Se actualizaron {$created} PlanEjercicio(s) para plansUserId={$plansUserId}.",
                false
                
            );
        } else {
            // si no se creó nada, lo registramos como warning -> severity 2
            ControllerUtils::logAction(
                "No se crearon PlanEjercicio(s) para plansUserId={$plansUserId}.",
                true,
                2
            );
        }
    }
}