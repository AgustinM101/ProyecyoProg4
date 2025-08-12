<?php

namespace Src\Service\Brand;

use Src\Entity\Brand\Brand;
use Src\Infrastructure\Repository\Brand\BrandRepository;

final readonly class BrandUpdaterService{

    private BrandRepository $repository;

    private BrandFinderService $finderService;

    public function __construct() {
        $this->repository = new Brandrepository();
        $this->finderService = new BrandFinderService();
    }
    public function update(string $name, string $code, int $id): void{

        $brand = $this->finderService->find($id);
        $brand->modify($name, $code);

        $this->repository->update($brand);
    }
    
}