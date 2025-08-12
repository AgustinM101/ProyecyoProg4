<?php

namespace Src\Service\Category;

use Src\Entity\Category\Category;
use Src\Infrastructure\Repository\Category\CategoryRepository;

final readonly class CategoryDeleterService{

    private CategoryRepository $repository;

    private CategoryFinderService $finderService;

    public function __construct() {
        $this->repository = new CategoryRepository();
        $this->finderService = new CategoryFinderService();
    }
    
    public function delete(int $id): void{


        $category = $this->finderService->find($id);
        $category->delete();

        $this->repository->update($category);
    }
    
}