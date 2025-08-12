<?php 

namespace Src\Infrastructure\Repository\Brand;

use Src\Entity\Brand\Brand;

interface BrandRepositoryInterface {
    public function find(int $id): ?Brand;
    public function search(): array;
    public function create(Brand $brand): void;
    public function update(Brand $brand): void;
    
    /** @return Brand[] */

}

