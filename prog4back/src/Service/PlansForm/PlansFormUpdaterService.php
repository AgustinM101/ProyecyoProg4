<?php

namespace Src\Service\PlansForm;

use Src\Infrastructure\Repository\PlansForm\PlansFormRepository;
use Src\Infrastructure\Repository\PlansUser\PlansUserRepository;
use Src\Infrastructure\Repository\User\UserRepository;
use Src\Infrastructure\Repository\Plan\PlanRepository;
use Src\Entity\PlansForm\PlansForm;
use Src\Utils\ControllerUtils;

final readonly class PlansFormUpdaterService
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

    public function update(PlansForm $plansForm): ?PlansForm
    {
        $existing = $this->repository->find($plansForm->id());

        if ($existing === null) {
            ControllerUtils::logAction(
                "Se intentó actualizar un formulario inexistente con ID {$plansForm->id()}",
                true,
                2
            );
            return null;
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

        // Actualizar el formulario
        $this->repository->update($plansForm);

        // Log de éxito
        ControllerUtils::logAction(
            "El usuario {$userName} actualizó su formulario ID {$plansForm->id()} asociado al plan {$planName}.",
            false
        );

        return $plansForm;
    }
}
