<?php 

use Src\Service\Plan\PlansSearcherService;

final readonly class PlansGetController {
    private PlansSearcherService $service;

    public function __construct() {
        $this->service = new PlansSearcherService();
    }

    public function start(): void
    {
        $plans = $this->service->search();

        echo json_encode($this->toResponse($plans));
    }

    private function toResponse(array $plans): array 
    {
        $responses = [];
        
        foreach($plans as $plan) {
            $responses[] = [
                "id" => $plan->id(),
                "name" => $plan->name(),
                "description" => $plan->description(),
                "price" => $plan->price(),
            ];
        }

        return $responses;
    }
}