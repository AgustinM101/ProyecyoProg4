<?php

namespace Src\Service\Plan;

use Src\Entity\Plan\Plan;
use Src\Infrastructure\Repository\Plan\PlanRepository;

final readonly class PlanCreatorService{

    private PlanRepository $repository;

    public function __construct() {
        $this->repository = new Planrepository();
    }
    public function create( string $name, string $description, int $price): void{
        $plan = Plan::create($name, $description, $plan);
        $this->repository->create($plan);
    }
    
}