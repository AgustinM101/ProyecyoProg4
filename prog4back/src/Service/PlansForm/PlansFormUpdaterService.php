<?php

namespace Src\Service\PlansForm;

use Src\Infrastructure\Repository\PlansForm\PlansFormRepository;
use Src\Entity\PlansForm\PlansForm;

final readonly class PlansFormUpdaterService
{
    private PlansFormRepository $repository;

    public function __construct()
    {
        $this->repository = new PlansFormRepository();
    }

    public function update(PlansForm $plansForm): ?PlansForm
    {
        // Verificar si existe
        $existing = $this->repository->find($plansForm->id());
        if ($existing === null) {
            return null;
        }

        // Actualizar en la base de datos
        $this->repository->update($plansForm);

        return $plansForm;
    }
}
