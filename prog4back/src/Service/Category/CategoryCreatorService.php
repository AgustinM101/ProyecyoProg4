<?php

namespace Src\Service\Category;

use Src\Entity\Category\Category;
use Src\Infrastructure\Repository\Category\CategoryRepository;

final readonly class CategoryCreatorService{

    private CategoryRepository $repository;

    public function __construct() {
        $this->repository = new Categoryrepository();
    }
    public function create(string $name, string $imageUrl): void{
        $category = Category::create($name, $imageUrl);
        $this->repository->create($category);
    }
    
}