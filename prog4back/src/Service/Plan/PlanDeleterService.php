<?php

namespace Src\Service\Plan;

use Src\Infrastructure\Repository\Plan\PlanRepository;
use Src\Service\Plan\PlanFinderService;
use Src\Utils\ControllerUtils;

final readonly class PlanDeleterService {
    private PlanRepository $repository;
    private PlanFinderService $finderService;

    public function __construct() {
        $this->repository = new PlanRepository();
        $this->finderService = new PlanFinderService();
    }

    public function delete(int $id): void {
        
        $plan = $this->finderService->find($id);

        
        $this->repository->softDelete($id);

        // Registrar log
        ControllerUtils::logAction("Se eliminó el plan: {$plan->name()}", true);
    }
}
