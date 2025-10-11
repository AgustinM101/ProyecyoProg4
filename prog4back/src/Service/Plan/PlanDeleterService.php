<?php

namespace Src\Service\Plan;

use Src\Entity\Plan\Plan;
use Src\Infrastructure\Repository\Plan\PlanRepository;

final readonly class PlanDeleterService {
    private PlanRepository $repository;

    public function __construct() {
        $this->repository = new PlanRepository();
    }

    public function delete(int $id): void {
        $this->repository->softDelete($id);
    }
}
