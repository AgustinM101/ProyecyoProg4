<?php

namespace Src\Service\PlanEjercicio;

use Src\Infrastructure\Repository\PlanEjercicio\PlanEjercicioRepository;
use Src\Entity\PlanEjercicio\PlanEjercicio;

final readonly class PlanEjercicioUpdaterService
{
    private PlanEjercicioRepository $repository;

    public function __construct() {
        $this->repository = new PlanEjercicioRepository();
    }

    public function update(int $id, string $name, string $description, string $tipo): ?PlanEjercicio
    {
        // Verificar si existe
        $plan = $this->repository->find($id);
        if ($plan === null) {
            return null;
        }

        // Crear objeto actualizado
        $updatedPlan = new PlanEjercicio($id, $name, $description, $tipo);

        // Actualizar en la base de datos
        $this->repository->update($updatedPlan);

        return $updatedPlan;
    }
}
