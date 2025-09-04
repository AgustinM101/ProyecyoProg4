<?php

namespace Src\Service\Plan;

use Src\Entity\Plan\Plan;
use Src\Infrastructure\Repository\Plan\PlanRepository;

final readonly class PlanDeleterService{

    private PlanRepository $repository;

    private PlanFinderService $finderService;

    public function __construct() {
        $this->repository = new PlanRepository();
        $this->finderService = new PlanFinderService();
    }
    
    public function delete(int $id): void{


        $plan = $this->finderService->find($id);
        $plan->delete();

        $this->repository->update($plan);
    }
    
}