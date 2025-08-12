<?php 

namespace Src\Infrastructure\Repository\Category;

use Src\Entity\Category\Category;

interface CategoryRepositoryInterface {


    public function find(int $id): ?Category;
    public function search(): array;
    public function create(Category $category): void;
    public function update(Category $category): void;
        
    /** @return Category[] */
    
}

