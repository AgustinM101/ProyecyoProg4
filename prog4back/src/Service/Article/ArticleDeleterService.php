<?php

namespace Src\Service\Article;

use Src\Entity\Article\Article;
use Src\Infrastructure\Repository\Article\ArticleRepository;

final readonly class ArticleDeleterService{

    private ArticleRepository $repository;

    private ArticleFinderService $finderService;

    public function __construct() {
        $this->repository = new ArticleRepository();
        $this->finderService = new ArticleFinderService();
    }
    
    public function delete(int $id): void{


        $article = $this->finderService->find($id);
        $article->delete();

        $this->repository->update($article);
    }
    
}