<?php 

namespace Src\Service\Domain;

use Src\Entity\Domain\Domain;
use Src\Infrastructure\Repository\Domain\DomainRepository;

final readonly class DomainCreatorService {
    private DomainRepository $repository;

    public function __construct() {
        $this->repository = new DomainRepository();
    }

    public function create(string $name, string $code): void
    {
        $domain = Domain::create($name, $code);
        $this->repository->insert($domain);
    }
}