<?php 

namespace Src\Service\Domain;

use Src\Infrastructure\Repository\Domain\DomainRepository;

final readonly class DomainDeleterService {
    private DomainRepository $repository;
    private DomainFinderService $finder;

    public function __construct() {
        $this->repository = new DomainRepository();
        $this->finder = new DomainFinderService();
    }

    public function delete(int $id): void
    {
        $domain = $this->finder->find($id);

        $domain->delete();

        $this->repository->update($domain);
    }
}