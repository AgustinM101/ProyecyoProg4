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


            if (!$plan) {
                            ControllerUtils::logAction(
                "Se intentó actualizar un plan de ejercicio inexistente con ID {$item['id']}",
                true,
                2
            ); 
                continue;
            }else{
                            ControllerUtils::logAction(
                "Se creó el plan de ejercicio para el usuario con ID {$plansUserId}",
                false
            ); 
            }
            $this->repository->createForUser($plan);
        }
    }
}
