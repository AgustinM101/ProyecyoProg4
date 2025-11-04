<?php

namespace Src\Service\PlansForm;

use Src\Entity\PlansForm\PlansForm;
use Src\Infrastructure\Repository\PlansForm\PlansFormRepository;
use Src\Entity\PlansForm\Exception\PlansFormNotFoundException;

final readonly class PlansFormFinderService
{
    private PlansFormRepository $repository;

    public function __construct()
    {
        $this->repository = new PlansFormRepository();
    }

    public function find(int $id): PlansForm
    {
        $plansForm = $this->repository->find($id);

        if ($plansForm === null) {
            throw new PlansFormNotFoundException($id);
        }

        return $plansForm;
    }
    /** @return PlansForm|null */
    public function findByPlansUserId(int $plansUserId): ?PlansForm
    {
        return $this->repository->findByPlansUser($plansUserId);
    }
}
