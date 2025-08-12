<?php 

namespace Src\Service\Category;

use Src\Entity\Category\Category;
use Src\Infrastructure\Repository\Category\CategoryRepository;
use Src\Entity\Category\Exception\CategoryNotFoundException;

final readonly class CategoryFinderService {

    private CategoryRepository $repository;

    public function __construct() {
        $this->repository = new CategoryRepository();
    }

    public function find(int $id): Category 
    {   
        $category = $this->repository->find($id);

        if ($category === null) {
            throw new CategoryNotFoundException($id);
        }

        return $category;
    }
}