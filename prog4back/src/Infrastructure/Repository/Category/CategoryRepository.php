<?php 

namespace Src\Infrastructure\Repository\Category;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\Category\Category;

final readonly class CategoryRepository extends PDOManager implements CategoryRepositoryInterface {
    public function find(int $id): ?Category
    {
        $query = <<<HEREDOC
                        SELECT 
                            *
                        FROM
                            categories A
                        WHERE
                            A.id = :id 
                        AND A.deleted = 0
                    HEREDOC;

        $parameters = [
            "id" => $id,
        ];

        $result = $this->execute($query, $parameters);

        return $this->toCategory($result[0] ?? null);
    }

    /** @return Category[] */
    public function search(): array
    {
        $query = <<<HEREDOC
                        SELECT
                            *
                        FROM
                            categories A 
                        WHERE
                            A.deleted = 0
                    HEREDOC;
        
        $results = $this->execute($query);

        $categories = [];
        foreach($results as $result) {
            $categories[] = $this->toCategory($result);
        }

        return $categories;
    }
    public function create(Category $category): void{



        $query = <<< INSERT_QUERY
                        INSERT INTO categories (name, imageUrl, deleted)
                        VALUES (:name, :imageUrl, :deleted)
                        INSERT_QUERY;
        
        $parameters = [
            "name" => $category->name(),
            "imageUrl" => $category->imageUrl(),
            "deleted" => $category->deleted()
        ];

        $this->execute($query, $parameters);
    }

    public function update(Category $category): void
    {
        $query = <<<UPDATE_QUERY
                        UPDATE categories
                        SET name = :name, imageUrl = :imageUrl, deleted = :deleted
                        WHERE id = :id
                    UPDATE_QUERY;

        $parameters = [
            "id" => $category->id(),
            "name" => $category->name(),
            "imageUrl" => $category->imageUrl(),
            "deleted" => $category->deleted()
        ];

        $this->execute($query, $parameters);
    }

    private function toCategory(?array $primitive): ?Category {
        if ($primitive === null) {
            return null;
        }

        return new Category(
            $primitive["id"],
            $primitive["name"],
            $primitive["imageUrl"],
        );
    }
}