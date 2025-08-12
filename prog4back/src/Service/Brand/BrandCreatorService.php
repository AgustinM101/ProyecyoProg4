<?php

namespace Src\Service\Brand;

use Src\Entity\Brand\Brand;
use Src\Infrastructure\Repository\Brand\BrandRepository;

final readonly class BrandCreatorService{

    private BrandRepository $repository;

    public function __construct() {
        $this->repository = new Brandrepository();
    }
    public function create(string $name, string $code): void{
        $brand = Brand::create($name, $code);
        $this->repository->create($brand);
    }
    
}