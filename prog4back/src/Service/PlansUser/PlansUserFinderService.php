<?php

namespace Src\Service\PlansUser;

use Src\Infrastructure\Repository\PlansUser\PlansUserRepository;
use Src\Entity\PlansUser\PlansUser;

final readonly class PlansUserFinderService {

    private PlansUserRepository $repository;

    public function __construct() {
        $this->repository = new PlansUserRepository();
    }

    /** @return PlansUser[] */
    public function findByUser(int $id_user): array {
        return $this->repository->findByUserId($id_user);
    }

    /** @return PlansUser[] */
    public function findAll(): array {
        return $this->repository->search();
    }
}
