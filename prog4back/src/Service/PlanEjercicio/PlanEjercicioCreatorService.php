<?php

namespace Src\Service\PlanEjercicio;

use Src\Entity\PlanEjercicio\PlanEjercicio;
use Src\Infrastructure\Repository\PlanEjercicio\PlanEjercicioRepository;

final readonly class PlanEjercicioCreatorService{

    private PlanEjercicioRepository $repository;

    public function __construct() {
        $this->repository = new PlanEjerciciorepository();
    }
    public function create( string $name, string $tipo, string $description): void{
        $planEjercicio = PlanEjercicio::create($name, $tipo, $description);
        $this->repository->create($planEjercicio);
    }
    
}