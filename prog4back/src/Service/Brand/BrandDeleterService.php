<?php

namespace Src\Service\Brand;

use Src\Entity\Brand\Brand;
use Src\Infrastructure\Repository\Brand\BrandRepository;

final readonly class BrandDeleterService{

    private BrandRepository $repository;

    private BrandFinderService $finderService;

    public function __construct() {
        $this->repository = new BrandRepository();
        $this->finderService = new BrandFinderService();
    }
    
    public function delete(int $id): void{

        $brand = $this->finderService->find($id);
        $brand->delete();

        $this->repository->update($brand);
    }
    
}