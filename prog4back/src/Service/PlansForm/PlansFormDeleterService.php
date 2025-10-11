<?php

namespace Src\Service\PlansForm;

use Src\Infrastructure\Repository\PlansForm\PlansFormRepository;

final readonly class PlansFormDeleterService
{
    private PlansFormRepository $repository;

    public function __construct()
    {
        $this->repository = new PlansFormRepository();
    }

    public function delete(int $id): bool
    {
        $plansForm = $this->repository->find($id);
        if ($plansForm === null) {
            return false; 
        }

        $this->repository->delete($id);
        return true;
    }
}
