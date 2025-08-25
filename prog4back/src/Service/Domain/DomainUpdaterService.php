<?php 

namespace Src\Service\Domain;

use Src\Infrastructure\Repository\Domain\DomainRepository;

final readonly class DomainUpdaterService {
    private DomainRepository $repository;
    private DomainFinderService $finder;

    public function __construct() {
        $this->repository = new DomainRepository();
        $this->finder = new DomainFinderService();
    }

    public function update(string $name, string $code, int $id): void
    {
        $domain = $this->finder->find($id);

        $domain->modify($name, $code);

        $this->repository->update($domain);
    }
}