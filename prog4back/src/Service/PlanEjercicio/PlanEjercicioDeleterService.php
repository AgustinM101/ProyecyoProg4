<?php

namespace Src\Service\PlanEjercicio;

use Src\Infrastructure\Repository\PlanEjercicio\PlanEjercicioRepository;

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
        }

        $this->repository->delete($id);
        return true; // borrado exitoso
    }
}
