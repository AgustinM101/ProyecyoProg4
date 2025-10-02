<?php

namespace Src\Service\PlansUser;

use Src\Infrastructure\Repository\PlansUser\PlansUserRepository;
use Src\Entity\PlansUser\PlansUser;

final readonly class PlansUserCreatorService
{
    private PlansUserRepository $repository;

    public function __construct() {
        $this->repository = new PlansUserRepository();
    }

    public function create(int $id_user, int $id_plan): PlansUser {
        $plansUser = new PlansUser(
            null,
            $id_user,
            $id_plan,
            "Pendiente",
            null
        );

        $this->repository->assignPlan($plansUser);

        return $plansUser;
    }
}
