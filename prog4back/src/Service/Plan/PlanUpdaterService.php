<?php

namespace Src\Service\Plan;

use Src\Entity\Plan\Plan;
use Src\Infrastructure\Repository\Plan\PlanRepository;
use Src\Utils\ControllerUtils;

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
        if (!$plan) {
            ControllerUtils::logAction("Intento de modificar un plan inexistente con ID $id", true, 1);
        }

        $this->repository->update($plan);
        // Registrar log
        ControllerUtils::logAction("Se actualizó el plan: {$plan->name()}, descripción:{$plan->description()}, precio: {$plan->price()} ", true);
    } 
    
}