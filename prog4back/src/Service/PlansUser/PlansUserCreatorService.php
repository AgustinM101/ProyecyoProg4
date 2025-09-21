<?php

namespace Src\Service\PlansUser;

use Src\Entity\PlansUser\PlansUser;
use Src\Infrastructure\Repository\PlansUser\PlansUserRepository;

final readonly class PlansUserCreatorService {

    private PlansUserRepository $repository;

    public function __construct() {
        $this->repository = new PlansUserRepository();
    }

    public function create(int $id_user, int $id_plan, string $status = 'pendiente'): void {
        $PlansUser = new PlansUser(null, $id_user, $id_plan, $status);
        $this->repository->assignPlan($plansUser);
    }
}
