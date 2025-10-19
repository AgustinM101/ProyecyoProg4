<?php

namespace Src\Service\PlansUser;

use Src\Infrastructure\Repository\PlansUser\PlansUserRepository;
use Src\Infrastructure\Repository\User\UserRepository;
use Src\Infrastructure\Repository\Plan\PlanRepository;
use Src\Utils\ControllerUtils;

final readonly class PlansUserRemoverService {

    private PlansUserRepository $repository;
    private UserRepository $userRepository;
    private PlanRepository $planRepository;

    public function __construct() {
        $this->repository = new PlansUserRepository();
        $this->userRepository = new UserRepository();
        $this->planRepository = new PlanRepository();
    }

    public function removePlanById(int $id): void {
        // Buscar el registro antes de eliminar
        $plansUser = $this->repository->findById($id);

        if ($plansUser) {
            $user = $this->userRepository->find($plansUser->userId());
            $plan = $this->planRepository->find($plansUser->planId());

            $userName = $user ? $user->name() : 'Desconocido';
            $planName = $plan ? $plan->name() : 'Desconocido';

            ControllerUtils::logAction(
                "Se eliminó la asignación del plan '{$planName}' para el usuario '{$userName}'.",
                true
            );

            // Eliminar después de loguear
            $this->repository->removePlanById($id);
        } else {
            // Log de alerta si el registro no existía
            ControllerUtils::logAction(
                "Se intentó eliminar una asignación de plan inexistente con ID {$id}.",
                true
            );
        }
    }
}
