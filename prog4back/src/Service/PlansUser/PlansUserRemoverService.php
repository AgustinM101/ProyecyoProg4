<?php

namespace Src\Service\PlansUser;

use Src\Infrastructure\Repository\PlansUser\PlansUserRepository;

final readonly class PlansUserRemoverService {

    private PlansUserRepository $repository;

    public function __construct() {
        $this->repository = new PlansUserRepository();
    }

    public function removePlanById(int $id): void {
        // Llama directamente al repo que elimina por id
        $this->repository->removePlanById($id);
    }
}

