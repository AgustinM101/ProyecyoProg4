<?php

namespace Src\Service\PlanEjercicio;

use Src\Entity\PlanEjercicio\PlanEjercicio;
use Src\Infrastructure\Repository\PlanEjercicio\PlanEjercicioRepository;

final readonly class PlanEjercicioDeleterService{

    private PlanEjercicioRepository $repository;

    private PlanEjercicioFinderService $finderService;

    public function __construct() {
        $this->repository = new PlanEjercicioRepository();
        $this->finderService = new PlanEjercicioFinderService();
    }
    
    public function delete(int $id): void{


        $planEjercicio = $this->finderService->find($id);
        $planEjercicio->delete();

        $this->repository->update($planEjercicio);
    }
    
}