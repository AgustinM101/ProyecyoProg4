<?php 

use Src\Service\Plan\PlanesSearcherService;

final readonly class PlanesGetController {
    private PlanesSearcherService $service;

    public function __construct() {
        $this->service = new PlanesSearcherService();
    }

    public function start(): void
    {
        $planes = $this->service->search();

        echo json_encode($this->toResponse($planes));
    }

    private function toResponse(array $planes): array 
    {
        $responses = [];
        
        foreach($planes as $plane) {
            $responses[] = [
                "id" => $plane->id(),
                "name" => $plane->name(),
                "description" => $plane->description(),
                "price" => $plane->price(),         
            ];
        }

        return $responses;
    }
}