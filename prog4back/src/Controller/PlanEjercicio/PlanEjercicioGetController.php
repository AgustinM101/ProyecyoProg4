<?php 

use Src\Service\PlanEjercicio\PlanEjercicioFinderService;

final readonly class PlanEjercicioGetController {

    private PlanEjercicioFinderService $service;

    public function __construct() {
        $this->service = new PlanEjercicioFinderService();
    }

    public function start($id): void  // quitamos el tipo int
    {
        $id = (int) trim($id); // elimina saltos de línea y espacios, y convierte a entero

        $planEjercicio = $this->service->find($id);

        echo json_encode([[
            "id" => $planEjercicio->id(),
            "name" => $planEjercicio->name(),
            "description" => $planEjercicio->description(),
            "tipo" => $planEjercicio->tipo(),
        ]]);
    }
}
