<?php

namespace Src\Service\Plan;

use Src\Entity\Plan\Plan;
use Src\Infrastructure\Repository\Plan\PlanRepository;

final readonly class PlanUpdaterService{

    private PlanRepository $repository;

    private PlanFinderService $finderService;

    public function __construct() {
        $this->repository = new PlanRepository();
        $this->finderService = new PlanFinderService();
    }
    public function update(string $name, string $description, int $price, int $id): void{

        $plan = $this->finderService->find($id);
        $plan->modify($name, $description, $price);

        $this->repository->update($plan);
        // Registrar log
        ControllerUtils::logAction("Se actualizó el plan: {$plan->name()}, descripción:{$plan->description()}, precio: {$plan->price()} ", true);
    } 
    
}