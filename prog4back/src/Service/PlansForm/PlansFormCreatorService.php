<?php

namespace Src\Service\PlansForm;

use Src\Entity\PlansForm\PlansForm;
use Src\Infrastructure\Repository\PlansForm\PlansFormRepository;

final readonly class PlansFormCreatorService
{
    private PlansFormRepository $repository;

    public function __construct()
    {
        $this->repository = new PlansFormRepository();
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
        // Se crea directamente la entidad sin usar un método estático
        $plansForm = new PlansForm(
            null, // id autoincremental
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

        // Se guarda en el repositorio
        $this->repository->create($plansForm);
    }
}
