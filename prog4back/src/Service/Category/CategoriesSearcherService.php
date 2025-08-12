<?php 

namespace Src\Service\Category;

use Src\Entity\Category\Category;
use Src\Infrastructure\Repository\Category\CategoryRepository;

final readonly class CategoriesSearcherService {
    private CategoryRepository $repository;

    public function __construct() {
        $this->repository = new CategoryRepository();
    }

    /** @return Category[] */
    public function search(): array
    {
        return $this->repository->search();
    }
}