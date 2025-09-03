<?php 

namespace Src\Infrastructure\Repository\Plan;

use Src\Entity\Plan\Plan;

interface PlanRepositoryInterface {
    public function find(int $id): ?Plan;
    public function search(): array;
    public function create(Plan $plan): void;
    public function update(Plan $plan): void;

    /** @return Plan[] */

}

