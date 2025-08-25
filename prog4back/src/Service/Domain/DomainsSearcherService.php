<?php 

namespace Src\Service\Domain;

use Src\Infrastructure\Repository\Domain\DomainRepository;

final readonly class DomainsSearcherService {

    private DomainRepository $repository;

    public function __construct() {
        $this->repository = new DomainRepository();
    }

    public function search(): array
    {
        return $this->repository->search();
    }
}