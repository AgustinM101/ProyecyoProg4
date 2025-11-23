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
        // Verificar existencia antes de borrar
        $plan = $this->repository->find($id);
        if ($plan === null) {
            // warning -> severity 2
            ControllerUtils::logAction(
                "Intento de eliminar PlanEjercicio inexistente con ID {$id}",
                true,
                2
            );
            return false; // no existe
        }

        // Intentar borrar con manejo de errores
        try {
            $this->repository->delete($id);
        } catch (\Throwable $e) {
            // error crítico al eliminar -> severity 3
            ControllerUtils::logAction(
                "Error al eliminar PlanEjercicio ID {$id}: " . $e->getMessage(),
                true,
                3
            );
            return false;
        }

        // Log de éxito -> activity/alert según uso (aquí se marca is_alert = true, severity 1)
        ControllerUtils::logAction(
            "Se eliminó PlanEjercicio ID {$id}.",
            false
            
        );

        return true; // borrado exitoso
    }
}
