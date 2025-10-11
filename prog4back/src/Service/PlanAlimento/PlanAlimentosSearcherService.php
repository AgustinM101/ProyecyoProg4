<?php 

namespace Src\Service\PlanAlimento;

use Src\Entity\PlanAlimento\PlanAlimento;
use Src\Infrastructure\Repository\PlanAlimento\PlanAlimentoRepository;

final readonly class PlanAlimentosSearcherService {
    private PlanAlimentoRepository $repository;

    public function __construct() {
        $this->repository = new PlanAlimentoRepository();
    }

    /** @return PlanAlimento[] */
    public function search(): array
    {
        return $this->repository->search();
    }
}