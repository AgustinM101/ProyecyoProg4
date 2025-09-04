<?php

namespace Src\Service\PlanAlimento;

use Src\Entity\PlanAlimento\PlanAlimento;
use Src\Infrastructure\Repository\PlanAlimento\PlanAlimentoRepository;

final readonly class PlanAlimentoDeleterService{

    private PlanAlimentoRepository $repository;

    private PlanAlimentoFinderService $finderService;

    public function __construct() {
        $this->repository = new PlanAlimentoRepository();
        $this->finderService = new PlanAlimentoFinderService();
    }
    
    public function delete(int $id): void{


        $planAlimento = $this->finderService->find($id);
        $planAlimento->delete();

        $this->repository->update($planAlimento);
    }
    
}