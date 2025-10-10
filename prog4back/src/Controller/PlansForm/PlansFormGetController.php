<?php 

use Src\Service\PlansForm\PlansFormFinderService;

final readonly class PlansFormGetController {

    private PlansFormFinderService $service;

    public function __construct() {
        $this->service = new PlansFormFinderService();
    }

    public function start(int $id): void
    {
        $plansForm = $this->service->find($id);
        
        echo json_encode([
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
            
        ]);
    }
}