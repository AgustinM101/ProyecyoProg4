<?php 

declare(strict_types = 1);

namespace Src\Infrastructure\Repository\Domain;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\Domain\Domain;

final readonly class DomainRepository extends PDOManager implements DomainRepositoryInterface {

    public function find(int $id): ?Domain 
    {
        $query = "SELECT * FROM domain WHERE id = :id AND deleted = 0";

        $parameters = [
            "id" => $id
        ];

        $result = $this->execute($query, $parameters);
        
        return $this->primitiveToDomain($result[0] ?? null);
    }

    public function search(): array
    {
        $query = "SELECT * FROM domain WHERE deleted = 0";
        $results = $this->execute($query);

        $domainResults = [];
        foreach ($results as $result) {
            $domainResults[] = $this->primitiveToDomain($result);
        }

        return $domainResults;
    }

    public function insert(Domain $domain): void
    {
        $query = "INSERT INTO domain (name, code, deleted) VALUES (:name, :code, :deleted) ";

        $parameters = [
            "name" => $domain->name(),
            "code" => $domain->code(),
            "deleted" => $domain->isDeleted()
        ];

        $this->execute($query, $parameters);
    }

    public function update(Domain $domain): void
    {
        $query = <<<UPDATE_QUERY
                        UPDATE
                            domain
                        SET
                            name = :name,
                            code = :code,
                            deleted = :deleted
                        WHERE
                            id = :id
                    UPDATE_QUERY;

        $parameters = [
            "name" => $domain->name(),
            "code" => $domain->code(),
            "deleted" => $domain->isDeleted(),
            "id" => $domain->id()
        ];

        $this->execute($query, $parameters);
    }

    private function primitiveToDomain(?array $primitive): ?Domain
    {
        if ($primitive === null) {
            return null;
        }

        return new Domain(
            $primitive["id"],
            $primitive["name"],
            $primitive["code"],
            (bool) $primitive["deleted"]
        );
    }
}