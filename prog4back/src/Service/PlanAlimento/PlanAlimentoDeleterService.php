<?php

namespace Src\Service\PlanAlimento;

use Src\Infrastructure\Repository\PlanAlimento\PlanAlimentoRepository;
use Src\Utils\ControllerUtils;

final readonly class PlanAlimentoDeleterService
{
    private PlanAlimentoRepository $repository;

    public function __construct() {
        $this->repository = new PlanAlimentoRepository();
    }
    
    public function delete(int $id): void {
        // Verificar existencia antes de borrar
        $plan = $this->repository->find($id);
        if ($plan === null) {
            // warning -> severity 2
            ControllerUtils::logAction(
                "Intento de eliminar PlanAlimento inexistente con ID {$id}",
                true,
                2
            );
            return; // nada que borrar
        }

        // Intentar borrar con manejo de errores
        try {
            $this->repository->delete($id);
        } catch (\Throwable $e) {
            // error crítico al eliminar -> severity 3
            ControllerUtils::logAction(
                "Error al eliminar PlanAlimento ID {$id}: " . $e->getMessage(),
                true,
                3
            );
            throw $e;
        }

        // Log de éxito -> activity/alert según uso (aquí se marca is_alert = true, severity 1)
        ControllerUtils::logAction(
            "Se eliminó PlanAlimento ID {$id}.",
            false
            
        );
    }
}
