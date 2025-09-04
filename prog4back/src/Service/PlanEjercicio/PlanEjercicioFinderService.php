<?php 

namespace Src\Service\PlanEjercicio;

use Src\Entity\PlanEjercicio\PlanEjercicio;
use Src\Infrastructure\Repository\PlanEjercicio\PlanEjercicioRepository;
use Src\Entity\PlanEjercicio\Exception\PlanEjercicioNotFoundException;

final readonly class PlanEjercicioFinderService {

    private PlanEjercicioRepository $repository;

    public function __construct() {
        $this->repository = new PlanEjercicioRepository();
    }

    public function find(int $id): PlanEjercicio
    {   
        $planEjercicio = $this->repository->find($id);

        if ($planEjercicio === null) {
            throw new PlanEjercicioNotFoundException($id);
        }

        return $planEjercicio;
    }
}