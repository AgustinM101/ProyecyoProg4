<?php 

use Src\Service\PlanAlimnto\PlanAlimentoFinderService;

final readonly class PlanAlimentoGetController {

    private PlanAlimentoFinderService $service;

    public function __construct() {
        $this->service = new PlanAlimentoFinderService();
    }

    public function start(int $id): void
    {
        $planAlimento = $this->service->find($id);
        
        echo json_encode([
            "id" => $planAlimento->id(),
            "name" => $planAlimento->name(),
            "description" => $planAlimento->description(),
            "tipo" => $planAlimento->tipo(),
        ]);
    }
}