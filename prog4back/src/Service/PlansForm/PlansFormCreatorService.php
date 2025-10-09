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

    /**
     * Crea un nuevo registro en plans_form y devuelve el objeto creado
     */
    public function create(
        string $nombre,
        int $edad,
        string $sexo,
        float $altura,
        float $peso_actual,
        float $peso_deseado,
        string $actividad_fisica,
        ?string $antecedentes_medicos,
        ?string $alergias,
        ?string $medicamentos,
        ?string $problemas_digestivos,
        ?string $comidas_diarias,
        ?string $alimentos_evitar,
        ?string $horarios_comida,
        ?string $consumo_agua,
        ?string $consumo_alcohol,
        string $fecha_registro,
        int $id_plans_user
    ): ?PlansForm {
        // Creamos el objeto de entidad
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
            $horarios_comida,
            $consumo_agua,
            $consumo_alcohol,
            $fecha_registro,
            $id_plans_user
        );

        // El repositorio devuelve el ID insertado
        $id = $this->repository->create($plansForm);

        if ($id !== null) {
            // Retorna el objeto con su ID asignado
            return new PlansForm(
                $id,
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
                $horarios_comida,
                $consumo_agua,
                $consumo_alcohol,
                $fecha_registro,
                $id_plans_user
            );
        }

        return null;
    }
}
