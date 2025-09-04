<?php 

namespace Src\Service\PlanEjercicio;

use Src\Entity\PlanEjercicio\PlanEjercicio;
use Src\Infrastructure\Repository\PlanEjercicio\PlanEjercicioRepository;

final readonly class PlanEjerciciosSearcherService {
    private PlanEjercicioRepository $repository;

    public function __construct() {
        $this->repository = new PlanEjercicioRepository();
    }

    /** @return PlanEjercicio[] */
    public function search(): array
    {
        return $this->repository->search();
    }
}