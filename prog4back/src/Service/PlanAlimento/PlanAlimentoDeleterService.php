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
            
        $this->repository->delete($id);
        if (!$id) {
            ControllerUtils::logAction("Se intentó eliminar un plan de alimento inexistente con ID: {$id}", true, 2);
            return;
        }
        ControllerUtils::logAction("Se eliminó el plan de alimento con ID: {$id}", false);
    }
}
