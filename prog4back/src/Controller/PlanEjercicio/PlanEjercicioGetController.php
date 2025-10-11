<?php 

use Src\Service\PlanEjercicio\PlanEjercicioFinderService;

final readonly class PlanEjercicioGetController {

    private PlanEjercicioFinderService $service;

    public function __construct() {
        $this->service = new PlanEjercicioFinderService();
    }

    public function start(int $id): void
    {
        $planEjercicio = $this->service->find($id);
        
        echo json_encode([
            "id" => $planEjercicio->id(),
            "name" => $planEjercicio->name(),
            "description" => $planEjercicio->description(),
            "tipo" => $planEjercicio->tipo(),
        ]);
    }
}