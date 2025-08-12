<?php 

namespace Src\Service\Brand;

use Src\Entity\Brand\Brand;
use Src\Infrastructure\Repository\Brand\BrandRepository;

final readonly class BrandsSearcherService {
    private BrandRepository $repository;

    public function __construct() {
        $this->repository = new BrandRepository();
    }

    /** @return Brand[] */
    public function search(): array
    {
        return $this->repository->search();
    }
}