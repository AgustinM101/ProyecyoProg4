<?php


use Src\Service\PlansForm\PlansFormUpdaterService;
use Src\Utils\ControllerUtils;
use Src\Entity\PlansForm\PlansForm;

final readonly class PlansFormPutController
{
    private PlansFormUpdaterService $service;

    public function __construct()
    {
        // Instanciamos el servicio directamente, igual que en tu ejemplo
        $this->service = new PlansFormUpdaterService();
    }

    public function start(int $id): void
    {
        try {
            // Recibimos los datos del PUT en JSON
            $plansForm = new PlansForm(
                $id,
                ControllerUtils::getPost('nombre'),
                (int) ControllerUtils::getPost('edad'),
                ControllerUtils::getPost('sexo'),
                (float) ControllerUtils::getPost('altura'),
                (float) ControllerUtils::getPost('peso_actual'),
                (float) ControllerUtils::getPost('peso_deseado'),
                ControllerUtils::getPost('actividad_fisica'),
                ControllerUtils::getPost('antecedentes_medicos', false, null),
                ControllerUtils::getPost('alergias', false, null),
                ControllerUtils::getPost('medicamentos', false, null),
                ControllerUtils::getPost('problemas_digestivos', false, null),
                (int) ControllerUtils::getPost('comidas_diarias'),
                ControllerUtils::getPost('alimentos_evitar', false, null),
                ControllerUtils::getPost('horarios_comidas'),
                (float) ControllerUtils::getPost('consumo_agua'),
                ControllerUtils::getPost('consumo_alcohol'),
                ControllerUtils::getPost('fecha_registro'),
                (int) ControllerUtils::getPost('id_plans_user')
            );

            // Actualizamos usando el servicio
            $this->service->update($plansForm);

            echo json_encode([
                "success" => true,
                "message" => "Plan actualizado correctamente"
            ]);
        } catch (\Exception $e) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "error" => $e->getMessage()
            ]);
        }
    }
}
