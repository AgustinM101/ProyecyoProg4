<?php

namespace Src\Service\PlansUser;

use Src\Infrastructure\Repository\PlansUser\PlansUserRepository;
use Src\Infrastructure\Repository\User\UserRepository;
use Src\Infrastructure\Repository\Plan\PlanRepository;
use Src\Entity\PlansUser\PlansUser;
use Src\Utils\ControllerUtils;

final readonly class PlansUserCreatorService
{
    private PlansUserRepository $repository;
    private UserRepository $userRepository;
    private PlanRepository $planRepository;

    public function __construct() {
        $this->repository = new PlansUserRepository();
        $this->userRepository = new UserRepository();
        $this->planRepository = new PlanRepository();
    }

    public function create(int $id_user, int $id_plan): PlansUser {
        $plansUser = new PlansUser(
            null,
            $id_user,
            $id_plan,
            "Pendiente",
            null
        );

        $this->repository->assignPlan($plansUser);

        // Obtener nombres para log
        $user = $this->userRepository->find($id_user);
        $plan = $this->planRepository->find($id_plan);

        $userName = $user ? $user->name() : 'Desconocido';
        $planName = $plan ? $plan->name() : 'Desconocido';
        
        if (!$user || !$plan) {
            ControllerUtils::logAction(
                "Se asignó un plan a un usuario, pero no se pudo encontrar el nombre del usuario o del plan. ID Usuario: $id_user, ID Plan: $id_plan",
                true,
                3
            );
        }

        ControllerUtils::logAction(
            "Se asignó el plan '{$planName}' al usuario '{$userName}'.",
            false
        );

        return $plansUser;
    }
}
