<?php

use Src\Service\PlansForm\PlansFormFinderService;

final readonly class PlansFormGetByUserPlanIdController {

    private PlansFormFinderService $service;

    public function __construct() {
        $this->service = new PlansFormFinderService();
    }

    public function start(int $plansUserId): void
    {
        $form = $this->service->findByPlansUserId($plansUserId);

        $response = [];

        if ($form) {
            $response = [
                "id" => $form->id(),
                "nombre" => $form->nombre(),
                "edad" => $form->edad(),
                "sexo" => $form->sexo(),
                "altura" => $form->altura(),
                "peso_actual" => $form->pesoActual(),
                "peso_deseado" => $form->pesoDeseado(),
                "actividad_fisica" => $form->actividadFisica(),
                "comidas_diarias" => $form->comidasDiarias(),
                "horarios_comidas" => $form->horariosComidas(),
                "consumo_agua" => $form->consumoAgua(),
                "consumo_alcohol" => $form->consumoAlcohol(),
                "alergias" => $form->alergias(),
                "alimentos_evitar" => $form->alimentosEvitar(),
                "antecedentes_medicos" => $form->antecedentesMedicos(),
                "medicamentos" => $form->medicamentos(),
                "problemas_digestivos" => $form->problemasDigestivos(),
                "fecha_registro" => $form->fechaRegistro(),
                "id_plans_user" => $form->idPlansUser()
            ];
        }

        echo json_encode($response);
    }
}
