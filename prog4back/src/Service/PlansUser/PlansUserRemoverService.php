<?php

namespace Src\Service\PlansUser;

use Src\Infrastructure\Repository\PlansUser\PlansUserRepository;
use Src\Entity\PlansUser\PlansUser;

final readonly class PlansUserRemoverService {

    private PlansUserRepository $repository;
    private PlansUserFinderService $finderService;

    public function __construct() {
        $this->repository = new PlansUserRepository();
        $this->finderService = new PlansUserFinderService();
    }

    public function remove(int $id): void {
        $plansUser = $this->finderService->findById($id); // devuelve la entidad
        $this->repository->delete($plansUser);            // pasa la entidad al repo
    }
}
