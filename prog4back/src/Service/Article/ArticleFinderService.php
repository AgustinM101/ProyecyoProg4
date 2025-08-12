<?php 

namespace Src\Service\Article;

use Src\Entity\Article\Article;
use Src\Infrastructure\Repository\Article\ArticleRepository;
use Src\Entity\Article\Exception\ArticleNotFoundException;

final readonly class ArticleFinderService {

    private ArticleRepository $repository;

    public function __construct() {
        $this->repository = new ArticleRepository();
    }

    public function find(int $id): Article 
    {   
        $article = $this->repository->find($id);

        if ($article === null) {
            throw new ArticleNotFoundException($id);
        }

        return $article;
    }
}