<?php

namespace Src\Service\PlanAlimento;

use Src\Entity\PlanAlimento\PlanAlimento;
use Src\Infrastructure\Repository\PlanAlimento\PlanAlimentoRepository;

final readonly class PlanAlimentoUserService {

    private PlanAlimentoRepository $repo;

    public function __construct() {
        $this->repo = new PlanAlimentoRepository();
    }

    public function createForUser(string $description, string $tipo, string $dias, int $idPlansUser): void
    {
        $plan = new PlanAlimento(
            null,       // id
            $description,
            $tipo,
            $dias,
            $idPlansUser,
            0           // deleted
        );

        $this->repo->createForUser($plan);
    }

    public function updateForUser(int $id, string $description, string $tipo, string $dias): void
    {
        $plan = new PlanAlimento(
            $id,
            $description,
            $tipo,
            $dias,
            null,   // no se cambia el id_plans_user
            0
        );

        $this->repo->updateForUser($plan);
    }
}
