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

    public function create(int $id_user, int $id_plan, string $status="pendiente",?string $expiration_date): PlansUser {
        $plansUser = new PlansUser(
            null, // ⚠️ Se asignará ID al guardar en DB
            $id_user,
            $id_plan,
            $status,
            $expiration_date
            
        );

        $this->repository->assignPlan($plansUser); // 🔹 Debe asignar el ID generado al objeto

        // Obtener nombres para log
        $user = $this->userRepository->find($id_user);
        $plan = $this->planRepository->find($id_plan);

        $userName = $user ? $user->name() : 'Desconocido';
        $planName = $plan ? $plan->name() : 'Desconocido';

        ControllerUtils::logAction(
            "Se asignó el plan '{$planName}' al usuario '{$userName}'.",
            false
        );

        return $plansUser;
    }
}

