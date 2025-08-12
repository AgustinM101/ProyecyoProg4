<?php 

namespace Src\Infrastructure\Repository\Brand;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\Brand\Brand;

final readonly class BrandRepository extends PDOManager implements BrandRepositoryInterface {
    public function find(int $id): ?Brand
    {
        $query = <<<HEREDOC
                        SELECT 
                            *
                        FROM
                            brand A
                        WHERE
                            A.id = :id
                    HEREDOC;

        $parameters = [
            "id" => $id,
        ];

        $result = $this->execute($query, $parameters);

        return $this->toBrand($result[0] ?? null);
    }

    /** @return Brand[] */
    public function search(): array
    {
        $query = <<<HEREDOC
                        SELECT
                            *
                        FROM
                            brand A
                    HEREDOC;
        
        $results = $this->execute($query);

        $brands = [];
        foreach($results as $result) {
            $brands[] = $this->toBrand($result);
        }

        return $brands;
    }
    public function create(Brand $brand): void{



        $query = <<< INSERT_QUERY
                        INSERT INTO brand (name, code, deleted)
                        VALUES (:name, :code, :deleted)
                        INSERT_QUERY;
        
        $parameters = [
            "name" => $brand->name(),
            "code" => $brand->code(),
            "deleted" => $brand->deleted(),
           
            
        ];
    

        $this->execute($query, $parameters);
    }
    public function update(Brand $brand): void
    {
        $query = <<< UPDATE_QUERY
                        UPDATE brand
                        SET name = :name, code = :code, deleted = :deleted
                        WHERE id = :id
                        UPDATE_QUERY;

        $parameters = [
            "id" => $brand->id(),
            "name" => $brand->name(),
            "code" => $brand->code(),
            "deleted" => $brand->deleted(),
        ];

        $this->execute($query, $parameters);
    }
    private function toBrand(?array $primitive): ?Brand {
        if ($primitive === null) {
            return null;
        }

        return new Brand(
            $primitive["id"],
            $primitive["name"],
            $primitive["code"],

        );
    }
}