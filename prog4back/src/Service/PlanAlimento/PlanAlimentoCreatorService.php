<?php

namespace Src\Service\PlanAlimento;

use Src\Entity\PlanAlimento\PlanAlimento;
use Src\Infrastructure\Repository\PlanAlimento\PlanAlimentoRepository;

final readonly class PlanAlimentoCreatorService{

    private PlanAlimentoRepository $repository;

    public function __construct() {
        $this->repository = new PlanAlimentorepository();
    }
    public function create( string $name, string $description, int $tipo): void{
        $planAlimento = PlanAlimento::create($name, $description, $tipo);
        $this->repository->create($planAlimento);
    }
    
}