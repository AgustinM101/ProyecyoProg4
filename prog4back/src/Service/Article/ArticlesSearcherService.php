<?php 

namespace Src\Service\Article;

use Src\Entity\Article\Article;
use Src\Infrastructure\Repository\Article\ArticleRepository;

final readonly class ArticlesSearcherService {
    private ArticleRepository $repository;

    public function __construct() {
        $this->repository = new ArticleRepository();
    }

    /** @return Article[] */
    public function search(): array
    {
        return $this->repository->search();
    }
}