<?php 

namespace Src\Infrastructure\Repository\PlanAlimento;

use Src\Entity\PlanAlimento\PlanAlimento;

interface PlanAlimentoRepositoryInterface {
    public function find(int $id): ?PlanAlimento;
    public function search(): array;
    public function create(PlanAlimento $planAlimento): void;
    public function update(PlanAlimento $planAlimento): void;

    public function findForUser(int $id_plans_user, int $id): ?PlanAlimento;

    public function createForUser(PlanAlimento $planAlimento): void;
    public function updateForUser(PlanAlimento $planAlimento): void;

    public function delete(int $id): void;

    /** @return PlanAlimento[] */

}

