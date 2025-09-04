<?php

namespace Src\Service\PlanEjercicio;

use Src\Entity\PlanEjercicio\PlanEjercicio;
use Src\Infrastructure\Repository\PlanEjercicio\PlanEjercicioRepository;

final readonly class PlanEjercicioUpdaterService{

    private PlanEjercicioRepository $repository;

    private PlanEjercicioFinderService $finderService;

    public function __construct() {
        $this->repository = new PlanEjercicioRepository();
        $this->finderService = new PlanEjercicioFinderService();
    }
    public function update(string $name, string $tipo, int $desctription): void{

        $planEjercicio = $this->finderService->find($id);
        $planEjercicio->modify($name, $tipo, $desctription);

        $this->repository->update($planEjercicio);
    }
    
}