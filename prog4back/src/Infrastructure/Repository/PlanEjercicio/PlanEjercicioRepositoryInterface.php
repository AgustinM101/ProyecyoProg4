<?php 

namespace Src\Infrastructure\Repository\PlanEjercicio;

use Src\Entity\PlanEjercicio\PlanEjercicio;

interface PlanEjercicioRepositoryInterface {
    public function find(int $id): ?PlanEjercicio;
    public function search(): array;
    public function create(PlanEjercicio $planEjercicio): void;
    public function update(PlanEjercicio $planEjercicio): void;

    /** @return PlanEjercicio[] */

}

