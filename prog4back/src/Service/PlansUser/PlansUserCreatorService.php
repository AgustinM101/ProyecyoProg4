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

    public function create(int $id_user, int $id_plan,string $status="paymentRequest"): PlansUser {
        $plansUser = new PlansUser(
            null,
            $id_user,
            $id_plan,
            $status,
            null
        );

        $this->repository->assignPlan($plansUser);

        // Obtener nombres para log
        $user = $this->userRepository->find($id_user);
        $plan = $this->planRepository->find($id_plan);

        $userName = $user ? $user->name() : 'Desconocido';
        $planName = $plan ? $plan->name() : 'Desconocido';
        

        if ($status === "paymentRequest") {
    ControllerUtils::logAction(
        "El usuario '{$userName}' solicitó el plan '{$planName}' (pendiente de confirmación).",
        false
    );
   } else {
    ControllerUtils::logAction(
        "Se asignó el plan '{$planName}' al usuario '{$userName}'.",
        false
    );
  
}



        return $plansUser;
      }
}

