<?php

namespace Src\Service\Category;

use Src\Entity\Category\Category;
use Src\Infrastructure\Repository\Category\CategoryRepository;

final readonly class CategoryUpdaterService{

    private CategoryRepository $repository;

    private CategoryFinderService $finderService;

    public function __construct() {
        $this->repository = new CategoryRepository();
        $this->finderService = new CategoryFinderService();
    }
    public function update(string $name, string $imageUrl, int $id): void{

        $category = $this->finderService->find($id);
        $category->modify($name, $imageUrl);

        $this->repository->update($category);
    }
    
}