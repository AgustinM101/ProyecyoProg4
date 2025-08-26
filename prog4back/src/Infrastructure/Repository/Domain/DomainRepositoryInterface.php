<?php 

declare(strict_types = 1);

namespace Src\Infrastructure\Repository\Domain;

use Src\Entity\Domain\Domain;

interface DomainRepositoryInterface {
    public function find(int $id): ?Domain;

    /** @return Domain[] */
    public function search(): array;

    public function insert(Domain $domain): void;

    public function update(Domain $domain): void;
}