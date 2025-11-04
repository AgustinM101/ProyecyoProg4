<?php

namespace Src\Service\Plan;

use Src\Entity\Plan\Plan;
use Src\Infrastructure\Repository\Plan\PlanRepository;
use Src\Utils\ControllerUtils;

final readonly class PlanCreatorService{

    private PlanRepository $repository;

    public function __construct() {
        $this->repository = new PlanRepository();
    }
    public function create( string $name, string $description, int $price): void{
        $plan = Plan::create($name, $description, $price);
        $this->repository->create($plan);
        if (!$plan) {
            ControllerUtils::logAction("Error al crear un nuevo plan: {$name}", true, 1);
        }

        // Registrar log
        ControllerUtils::logAction("Se creó un nuevo plan: {$plan->name()}", false);
    }
    
}