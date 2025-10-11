<?php 

use Src\Service\PlansForm\PlansFormFinderService;

final readonly class PlansFormGetController {

    private PlansFormFinderService $service;

    public function __construct() {
        $this->service = new PlansFormFinderService();
    }

    public function start(int $id): void
    {
        // Por ahora no usamos $id, pero podrías usarlo para traer distintos formularios según el plan.
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: http://localhost:5173');
        header('Access-Control-Allow-Methods: GET, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');

        $fields = [
            [ "name" => "nombre", "type" => "text", "label" => "Nombre completo", "required" => true ],
            [ "name" => "edad", "type" => "number", "label" => "Edad", "required" => true ],
            [ "name" => "sexo", "type" => "select", "label" => "Sexo", "options" => ["Femenino", "Masculino", "Otro"], "required" => true ],
            [ "name" => "altura", "type" => "number", "label" => "Altura (cm)", "required" => true ],
            [ "name" => "peso_actual", "type" => "number", "label" => "Peso actual (kg)", "required" => true ],
            [ "name" => "peso_deseado", "type" => "number", "label" => "Peso deseado (kg)", "required" => true ],
            [ "name" => "actividad_fisica", "type" => "select", "label" => "Actividad física", "options" => ["Baja", "Media", "Alta"], "required" => true ],
            [ "name" => "antecedentes_medicos", "type" => "text", "label" => "Antecedentes médicos", "required" => false ],
            [ "name" => "alergias", "type" => "text", "label" => "Alergias", "required" => false ],
            [ "name" => "medicamentos", "type" => "text", "label" => "Medicamentos", "required" => false ],
            [ "name" => "problemas_digestivos", "type" => "text", "label" => "Problemas digestivos", "required" => false ],
            [ "name" => "comidas_diarias", "type" => "number", "label" => "Comidas diarias", "required" => false ],
            [ "name" => "alimentos_evitar", "type" => "text", "label" => "Alimentos a evitar", "required" => false ],
            [ "name" => "horarios_comidas", "type" => "text", "label" => "Horarios de comidas", "required" => false ],
            [ "name" => "consumo_agua", "type" => "number", "label" => "Consumo de agua (litros/día)", "required" => false ],
            [ "name" => "consumo_alcohol", "type" => "text", "label" => "Consumo de alcohol", "required" => false ],
        ];

        echo json_encode([
            "success" => true,
            "data" => [ "fields" => $fields ]
        ]);
    }
}
