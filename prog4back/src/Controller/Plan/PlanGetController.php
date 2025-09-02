<?php 

use Src\Service\Plan\PlanFinderService;

final readonly class PlanGetController {

    private PlanFinderService $service;

    public function __construct() {
        $this->service = new PlanFinderService();
    }

    public function start(int $id): void
    {
        $plan = $this->service->find($id);
        
        echo json_encode([
            "id" => $plan->id(),
            "name" => $plan->name(),
            "description" => $plan->description(),
            "price" => $plan->price(),
        ]);
    }
}