<?php

namespace Src\Service\PlansUser;

use Src\Infrastructure\Repository\PlansUser\PlansUserRepository;
use Src\Service\PlansUser\PlansUserFinderService;

final readonly class PlansUserUpdaterService {

    private PlansUserRepository $repository;
    private PlansUserFinderService $finderService;

    public function __construct() {
        $this->repository = new PlansUserRepository();
        $this->finderService = new PlansUserFinderService();
    }

    public function update(int $id, string $status, string $expiration_date): void {
        // Obtenemos el plans_user por id
        $plansUser = $this->finderService->findById($id);
        if (!$plansUser) {
            throw new \Exception("No se encontró el plan del usuario con id $id");
        }

        // Modificamos la entidad
        $plansUser->modify($status, $expiration_date);

        // Actualizamos en la base de datos
        $this->repository->updateStatusAndExpirationById($id, $status, $expiration_date);
    }
}
