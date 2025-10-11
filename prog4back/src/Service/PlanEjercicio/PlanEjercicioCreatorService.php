<?php

namespace Src\Service\PlanEjercicio;

use Src\Entity\PlanEjercicio\PlanEjercicio;
use Src\Infrastructure\Repository\PlanEjercicio\PlanEjercicioRepository;

final readonly class PlanEjercicioCreatorService{

    private PlanEjercicioRepository $repository;

    public function __construct() {
        $this->repository = new PlanEjercicioRepository();
    }

    public function create(string $name, string $description, string $tipo): ?PlanEjercicio
{
    $plan = new PlanEjercicio(null, $name, $description, $tipo);
    return $this->repository->create($plan); // debe devolver el objeto con ID
}

    
}