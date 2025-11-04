<?php

namespace Src\Service\PlansForm;

use Src\Infrastructure\Repository\PlansForm\PlansFormRepository;
use Src\Infrastructure\Repository\PlansUser\PlansUserRepository;
use Src\Infrastructure\Repository\User\UserRepository;
use Src\Infrastructure\Repository\Plan\PlanRepository;
use Src\Utils\ControllerUtils;

final readonly class PlansFormDeleterService
{
    private PlansFormRepository $repository;
    private PlansUserRepository $plansUserRepository;
    private UserRepository $userRepository;
    private PlanRepository $planRepository;

    public function __construct()
    {
        $this->repository = new PlansFormRepository();
        $this->plansUserRepository = new PlansUserRepository();
        $this->userRepository = new UserRepository();
        $this->planRepository = new PlanRepository();
    }

    public function delete(int $id): bool
    {
        $plansForm = $this->repository->find($id);

        // Si el formulario no existe
        if ($plansForm === null) {
            ControllerUtils::logAction("Se intentó eliminar un formulario inexistente con ID $id", true, 2);
            return false;
        }

        // Buscar relaciones
        $plansUser = $this->plansUserRepository->findById($plansForm->id_plans_user());
        $userName = 'Desconocido';
        $planName = 'Desconocido';

        if ($plansUser) {
            $user = $this->userRepository->find($plansUser->userId());
            $plan = $this->planRepository->find($plansUser->planId());

            if ($user) $userName = $user->name();
            if ($plan) $planName = $plan->name();
        }

        // Eliminar el formulario
        $this->repository->delete($id);

        // Registrar log
        ControllerUtils::logAction(
            "Se eliminó el formulario ID {$plansForm->id()} del usuario {$userName} correspondiente al plan {$planName}.",
            false
        );

        return true;
    }
}
