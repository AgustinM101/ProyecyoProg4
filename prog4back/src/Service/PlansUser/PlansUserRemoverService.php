<?php

namespace Src\Service\PlansUser;

use Src\Infrastructure\Repository\PlansUser\PlansUserRepository;

final readonly class PlansUserRemoverService {

    private PlansUserRepository $repository;

    public function __construct() {
        $this->repository = new PlansUserRepository();
    }

    public function remove(int $id_user, int $id_plan): void {
        $this->repository->removePlan($id_user, $id_plan);
    }
}
