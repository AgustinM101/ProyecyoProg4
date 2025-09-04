<?php

namespace Src\Service\PlanAlimento;

use Src\Entity\PlanAlimento\PlanAlimento;
use Src\Infrastructure\Repository\PlanAlimento\PlanAlimentoRepository;

final readonly class PlanAlimentoUpdaterService{

    private PlanAlimentoRepository $repository;

    private PlanAlimentoFinderService $finderService;

    public function __construct() {
        $this->repository = new PlanAlimentoRepository();
        $this->finderService = new PlanAlimentoFinderService();
    }
    public function update(string $name, string $description, int $tipo): void{

        $planAlimento = $this->finderService->find($id);
        $planAlimento->modify($name, $description, $tipo);

        $this->repository->update($planAlimento);
    }
    
}