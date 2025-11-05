<?php 

namespace Src\Service\PlanAlimento;

use Src\Infrastructure\Repository\PlanAlimento\PlanAlimentoRepository;
use Src\Entity\PlanAlimento\PlanAlimento;

final readonly class PlanAlimentoFinderService {

    private PlanAlimentoRepository $repository;

    public function __construct() {
        $this->repository = new PlanAlimentoRepository();
    }

    // Método existente
    public function find(int $id): PlanAlimento
    {   
        $planAlimento = $this->repository->find($id);

        if ($planAlimento === null) {
            throw new \Exception("PlanAlimento no encontrado: $id");
        }

        return $planAlimento;
    }

    // NUEVO: traer todos los alimentos de un plan de usuario
    /** @return PlanAlimento[] */
    public function findByPlansUserId(int $plansUserId): array
    {
        return $this->repository->findByPlanUser($plansUserId);
    }
}
