<?php 

namespace Src\Service\Brand;

use Src\Entity\Brand\Brand;
use Src\Infrastructure\Repository\Brand\BrandRepository;
use Src\Entity\Brand\Exception\BrandNotFoundException;

final readonly class BrandFinderService {

    private BrandRepository $repository;

    public function __construct() {
        $this->repository = new BrandRepository();
    }

    public function find(int $id): Brand 
    {   
        $brand = $this->repository->find($id);

        if ($brand === null) {
            throw new BrandNotFoundException($id);
        }

        return $brand;
    }
}