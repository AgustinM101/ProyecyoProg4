<?php 

namespace Src\Service\Plan;

use Src\Entity\Plan\Plan;
use Src\Infrastructure\Repository\Plan\PlanRepository;

final readonly class PlansSearcherService {
    private PlanRepository $repository;

    public function __construct() {
        $this->repository = new PlanRepository();
    }

    /** @return Plan[] */
    public function search(): array
    {
        return $this->repository->search();
    }
}