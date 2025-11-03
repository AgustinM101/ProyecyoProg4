<?php 

namespace Src\Infrastructure\Repository\PlanEjercicio;

use Src\Entity\PlanEjercicio\PlanEjercicio;

interface PlanEjercicioRepositoryInterface {

   
    public function find(int $id): ?PlanEjercicio;

    public function search(): array;

    public function create(PlanEjercicio $planEjercicio): void;

    public function update(PlanEjercicio $planEjercicio): void;

    public function delete(int $id): void;

    public function findByPlanUser(int $id_plans_user): array;

    public function findForUser(int $id_plans_user, int $id): ?PlanEjercicio;

    public function createForUser(PlanEjercicio $planEjercicio): void;
    public function updateForUser(PlanEjercicio $planEjercicio): void;
  

    /** @return PlanEjercicio[] */
}
