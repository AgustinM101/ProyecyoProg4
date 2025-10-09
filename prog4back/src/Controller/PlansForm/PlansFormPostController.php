<?php

use Src\Utils\ControllerUtils;
use Src\Service\PlansForm\PlansFormCreatorService;

final readonly class PlansFormPostController
{
    private PlansFormCreatorService $service;

    public function __construct() {
        $this->service = new PlansFormCreatorService();
    }

    public function start(): void {
        // Intentar leer JSON raw
        $input = json_decode(file_get_contents('php://input'), true);

        if (is_array($input)) {
            $nombre = $input['nombre'] ?? null;
            $edad = $input['edad'] ?? null;
            $sexo = $input['sexo'] ?? null;
            $altura = $input['altura'] ?? null;
            $peso_actual = $input['peso_actual'] ?? null;
            $peso_deseado = $input['peso_deseado'] ?? null;
            $actividad_fisica = $input['actividad_fisica'] ?? null;
            $antecedentes_medicos = $input['antecedentes_medicos'] ?? null;
            $alergias = $input['alergias'] ?? null;
            $medicamentos = $input['medicamentos'] ?? null;
            $problemas_digestivos = $input['problemas_digestivos'] ?? null;
            $comidas_diarias = $input['comidas_diarias'] ?? null;
            $alimentos_evitar = $input['alimentos_evitar'] ?? null;
            $horarios_comidas = $input['horarios_comidas'] ?? null;
            $consumo_agua = $input['consumo_agua'] ?? null;
            $consumo_alcohol = $input['consumo_alcohol'] ?? null;
            $fecha_registro = $input['fecha_registro'] ?? null;
            $id_plans_user = $input['id_plans_user'] ?? null;

        } else {
            // Si no hay JSON, usar form-data / x-www-form-urlencoded
            $nombre = ControllerUtils::getPost("nombre");
            $edad = ControllerUtils::getPost("edad");
            $sexo = ControllerUtils::getPost("sexo");
            $altura = ControllerUtils::getPost("altura");
            $peso_actual = ControllerUtils::getPost("peso_actual");
            $peso_deseado = ControllerUtils::getPost("peso_deseado");
            $actividad_fisica = ControllerUtils::getPost("actividad_fisica");
            $antecedentes_medicos = ControllerUtils::getPost("antecedentes_medicos");
            $alergias = ControllerUtils::getPost("alergias");
            $medicamentos = ControllerUtils::getPost("medicamentos");
            $problemas_digestivos = ControllerUtils::getPost("problemas_digestivos");
            $comidas_diarias = ControllerUtils::getPost("comidas_diarias");
            $alimentos_evitar = ControllerUtils::getPost("alimentos_evitar");
            $horarios_comidas = ControllerUtils::getPost("horarios_comidas");
            $consumo_agua = ControllerUtils::getPost("consumo_agua");
            $consumo_alcohol = ControllerUtils::getPost("consumo_alcohol");
            $fecha_registro = ControllerUtils::getPost("fecha_registro");
            $id_plans_user = ControllerUtils::getPost("id_plans_user");
        }

        // Validar parámetros obligatorios
        if (!$nombre || !$edad || !$sexo || !$altura || !$peso_actual || !$peso_deseado || !$actividad_fisica || !$antecedentes_medicos || !$alergias || !$medicamentos || !$problemas_digestivos || !$comidas_diarias || !$alimentos_evitar || !$horarios_comidas || !$consumo_agua || !$consumo_alcohol || !$fecha_registro || !$id_plans_user) {
            echo json_encode([
                "status" => 400,
                "message" => "Missing parameters: nombre, edad, sexo, altura, peso_actual, peso_deseado, actividad_fisica, antecedentes_medicos, alergias, medicamentos, problemas_digestivos, comidas_diarias, alimentos_evitar, horarios_comidas, consumo_agua, consumo_alcohol, fecha_registro, and id_plans_user are required."
            ]);
            return;
        }

        // Crear el plan
        $planAlimento = $this->service->create($nombre, $edad, $sexo, $altura, $peso_actual, $peso_deseado, $actividad_fisica, $antecedentes_medicos, $alergias, $medicamentos, $problemas_digestivos, $comidas_diarias, $alimentos_evitar, $horarios_comidas, $consumo_agua, $consumo_alcohol, $fecha_registro, $id_plans_user);

        echo json_encode([
            "status" => "ok",
            "data" => $planAlimento
        ]);
    }
}
