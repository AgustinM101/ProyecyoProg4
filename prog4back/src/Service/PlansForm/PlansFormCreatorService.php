<?php

namespace Src\Service\PlansForm;

use Src\Entity\PlansForm\PlansForm;
use Src\Infrastructure\Repository\PlansForm\PlansFormRepository;
use Src\Infrastructure\Repository\PlansUser\PlansUserRepository;
use Src\Infrastructure\Repository\User\UserRepository;
use Src\Infrastructure\Repository\Plan\PlanRepository;
use Src\Utils\ControllerUtils;

final readonly class PlansFormCreatorService
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

    public function create(
        string $nombre,
        int $edad,
        string $sexo,
        float $altura,
        float $peso_actual,
        float $peso_deseado,
        string $actividad_fisica,
        string $antecedentes_medicos,
        string $alergias,
        string $medicamentos,
        string $problemas_digestivos,
        string $comidas_diarias,
        string $alimentos_evitar,
        string $horarios_comidas,
        float $consumo_agua,
        float $consumo_alcohol,
        string $fecha_registro,
        int $id_plans_user
    ): void {
        // Crear entidad
        $plansForm = new PlansForm(
            null,
            $nombre,
            $edad,
            $sexo,
            $altura,
            $peso_actual,
            $peso_deseado,
            $actividad_fisica,
            $antecedentes_medicos,
            $alergias,
            $medicamentos,
            $problemas_digestivos,
            $comidas_diarias,
            $alimentos_evitar,
            $horarios_comidas,
            $consumo_agua,
            $consumo_alcohol,
            $fecha_registro,
            $id_plans_user
        );

        // Guardar en DB
        $this->repository->create($plansForm);

        // Buscar datos relacionados para el log
        $plansUser = $this->plansUserRepository->findById($id_plans_user);

        if ($plansUser) {
            $user = $this->userRepository->find($plansUser->userId());
            $plan = $this->planRepository->find($plansUser->planId());

            $userName = $user ? $user->name() : 'Desconocido';
            $planName = $plan ? $plan->name() : 'Desconocido';

            ControllerUtils::logAction(
                "El usuario {$userName} completó el formulario de plan {$planName}.",
                false
            );
        } else {
            ControllerUtils::logAction(
                "Se creó un nuevo formulario sin datos de plan/usuario asociados.",
                true
            );
        }
    }
}
