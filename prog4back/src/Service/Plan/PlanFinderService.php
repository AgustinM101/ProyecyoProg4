<?php 

namespace Src\Service\Plan;

use Src\Entity\Plan\Plan;
use Src\Infrastructure\Repository\Plan\PlanRepository;
use Src\Entity\Plan\Exception\PlanNotFoundException;

final readonly class PlanFinderService {

    private PlanRepository $repository;

    public function __construct() {
        $this->repository = new PlanRepository();
    }

    public function find(int $id): Plan
    {   
        $plan = $this->repository->find($id);

        if ($plan === null) {
            throw new PlanNotFoundException($id);
        }

        return $plan;
    }
}