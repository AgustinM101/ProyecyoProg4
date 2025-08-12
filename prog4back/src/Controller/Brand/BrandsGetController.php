<?php 

use Src\Service\Brand\BrandsSearcherService;

final readonly class BrandsGetController {
    private BrandsSearcherService $service;

    public function __construct() {
        $this->service = new BrandsSearcherService();
    }

    public function start(): void
    {
        $brands = $this->service->search();

        echo json_encode($this->toResponse($brands));
    }

    private function toResponse(array $brands): array 
    {
        $responses = [];
        
        foreach($brands as $brand) {
            $responses[] = [
                "id" => $brand->id(),
                "name" => $brand->name(),
                "code" => $brand->code(),
            ];
        }

        return $responses;
    }
}