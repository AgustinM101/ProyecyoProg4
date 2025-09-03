<?php 

namespace Src\Service\PlanAlimento;

use Src\Entity\PlanAlimento\PlanAlimento;
use Src\Infrastructure\Repository\PlanAlimento\PlanAlimentoRepository;
use Src\Entity\PlanAlimento\Exception\PlanAlimentoNotFoundException;

final readonly class PlanAlimentoFinderService {

    private PlanAlimentoRepository $repository;

    public function __construct() {
        $this->repository = new PlanAlimentoRepository();
    }

    public function find(int $id): PlanAlimento
    {   
        $planAlimento = $this->repository->find($id);

        if ($planAlimento === null) {
            throw new PlanAlimentoNotFoundException($id);
        }

        return $planAlimento;
    }
}