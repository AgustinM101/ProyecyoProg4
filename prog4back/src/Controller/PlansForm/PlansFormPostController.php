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

        $id_plans_user = ControllerUtils::getPost("id_plans_user");


        
        $plan = $this->service->create($nombre, $edad, $sexo, $altura, $peso_actual, $peso_deseado, $actividad_fisica, $antecedentes_medicos, $alergias, $medicamentos, $problemas_digestivos, $comidas_diarias, $alimentos_evitar, $horarios_comidas, $consumo_agua, $consumo_alcohol, $id_plans_user);
    }
}

