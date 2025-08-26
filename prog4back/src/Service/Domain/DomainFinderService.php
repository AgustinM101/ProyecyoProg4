<?php 


declare(strict_types = 1);

namespace Src\Service\Domain;

use Src\Entity\Domain\Domain;
use Src\Entity\Domain\Exception\DomainNotFoundException;
use Src\Infrastructure\Repository\Domain\DomainRepository;

final readonly class DomainFinderService {

    private DomainRepository $domainRepository;

    public function __construct() 
    {
        $this->domainRepository = new DomainRepository();
    }

    public function find(int $id): Domain 
    {
        $domain = $this->domainRepository->find($id);

        if ($domain === null) {
            throw new DomainNotFoundException($id);
        }

        return $domain;
    }

}
