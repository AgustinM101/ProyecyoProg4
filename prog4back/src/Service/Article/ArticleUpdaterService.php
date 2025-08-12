<?php

namespace Src\Service\Article;

use Src\Entity\Article\Article;
use Src\Infrastructure\Repository\Article\ArticleRepository;

final readonly class ArticleUpdaterService{

    private ArticleRepository $repository;

    private ArticleFinderService $finderService;

    public function __construct() {
        $this->repository = new ArticleRepository();
        $this->finderService = new ArticleFinderService();
    }
    public function update(int $price, string $description, int $stock, string $imageUrl, string $name, int $id): void{

        $article = $this->finderService->find($id);
        $article->modify($price, $description, $stock, $imageUrl, $name);

        $this->repository->update($article);
    }
    
}