<?php

namespace Src\Service\PlansUser;

use Src\Infrastructure\Repository\PlansUser\PlansUserRepository;
use Src\Infrastructure\Repository\User\UserRepository;
use Src\Infrastructure\Repository\Plan\PlanRepository;
use Src\Utils\ControllerUtils;

final readonly class PlansUserUpdaterService {

    private PlansUserRepository $repository;
    private UserRepository $userRepository;
    private PlanRepository $planRepository;

    public function __construct() {
        $this->repository = new PlansUserRepository();
        $this->userRepository = new UserRepository();
        $this->planRepository = new PlanRepository();
    }

    public function updateStatusAndExpirationById(int $id, string $status, string $expiration_date): void {
        $plansUser = $this->repository->findById($id);

        if ($plansUser) {
            $user = $this->userRepository->find($plansUser->userId());
            $plan = $this->planRepository->find($plansUser->planId());

            $userName = $user ? $user->name() : 'Desconocido';
            $planName = $plan ? $plan->name() : 'Desconocido';

            $this->repository->updateStatusAndExpirationById($id, $status, $expiration_date);

            ControllerUtils::logAction(
                "Se actualizó la asignación del plan '{$planName}' para el usuario '{$userName}' a estado '{$status}' con expiración '{$expiration_date}'.",
                false
            );
        } else {
            ControllerUtils::logAction(
                "Se intentó actualizar una asignación de plan inexistente con ID {$id}.",
                true
            );
        }
    }
}

