<?php 

namespace Src\Infrastructure\Repository\Article;

use Src\Entity\Article\Article;

interface ArticleRepositoryInterface {


    public function find(int $id): ?Article;
    public function search(): array;
    public function create(Article $article): void;
    public function update(Article $article): void;
        
    /** @return Article[] */
    
}

