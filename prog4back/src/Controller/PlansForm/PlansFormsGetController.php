<?php

use Src\Service\PlansForm\PlansFormsSearcherService;

final readonly class PlansFormsGetController {
    private PlansFormsSearcherService $service;

    public function __construct() {
        $this->service = new PlansFormsSearcherService();
    }

    public function start(): void
    {
        $plansForms = $this->service->search();
        echo json_encode($this->toResponse($plansForms));
    }

    private function toResponse(array $plansForms): array
    {
        $responses = [];
        foreach ($plansForms as $plansForm) {
            $responses[] = [
                "id" => $plansForm->id(),
                "nombre" => $plansForm->nombre(),
                "edad" => $plansForm->edad(),
                "sexo" => $plansForm->sexo(),
                "altura" => $plansForm->altura(),
                "peso_actual" => $plansForm->pesoActual(),
                "peso_deseado" => $plansForm->pesoDeseado(),
                "actividad_fisica" => $plansForm->actividadFisica(),
                "antecedentes_medicos" => $plansForm->antecedentesMedicos(),
                "alergias" => $plansForm->alergias(),
                "medicamentos" => $plansForm->medicamentos(),
                "problemas_digestivos" => $plansForm->problemasDigestivos(),
                "comidas_diarias" => $plansForm->comidasDiarias(),
                "alimentos_evitar" => $plansForm->alimentosEvitar(),
                "horarios_comidas" => $plansForm->horariosComidas(),
                "consumo_agua" => $plansForm->consumoAgua(),
                "consumo_alcohol" => $plansForm->consumoAlcohol(),
                "fecha_registro" => $plansForm->fechaRegistro(),
                "id_plans_user" => $plansForm->idPlansUser()
            ];
        }
        return $responses;
    }
}
