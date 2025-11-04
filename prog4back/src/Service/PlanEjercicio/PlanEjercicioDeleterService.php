<?php

namespace Src\Service\PlanEjercicio;

use Src\Infrastructure\Repository\PlanEjercicio\PlanEjercicioRepository;
use Src\Utils\ControllerUtils;

final readonly class PlanEjercicioDeleterService
{
    private PlanEjercicioRepository $repository;

    public function __construct() {
        $this->repository = new PlanEjercicioRepository();
    }

    public function delete(int $id): bool
    {
        // Opcional: podés verificar si existe antes de borrar
        $plan = $this->repository->find($id);
        if ($plan === null) {
             return false; // no existe
            ControllerUtils::logAction("Se intentó eliminar un plan de ejercicio inexistente con ID $id", true, 2);

        }

        $this->repository->delete($id);
        ControllerUtils::logAction("Se eliminó el plan de ejercicio con ID $id", false);
        return true; // borrado exitoso
    }
}
