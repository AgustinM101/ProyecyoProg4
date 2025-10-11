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
        return $this->repository->searchplans();
    }
    
    /** @return PlansUser|null */
public function findById(int $id): ?PlansUser {
    return $this->repository->findById($id);
}


    /** @return array[] */
public function findAllWithDetails(): array {
    return $this->repository->searchPlansWithDetails();
}

/** @return array[] */
public function findByUserWithDetails(int $id_user): array {
    return $this->repository->findByUserIdWithDetails($id_user);
}
}
