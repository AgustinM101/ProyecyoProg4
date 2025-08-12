<?php 

use Src\Service\Brand\BrandFinderService;

final readonly class BrandGetController {

    private BrandFinderService $service;

    public function __construct() {
        $this->service = new BrandFinderService();
    }

    public function start(int $id): void
    {
        $brand = $this->service->find($id);
        
        echo json_encode([
            "id" => $brand->id(),
            "name" => $brand->name(),
            "code" => $brand->code(),
        ]);
    }
}