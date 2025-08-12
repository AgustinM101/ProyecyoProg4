<?php 

namespace Src\Service\Client;

use Src\Entity\Client\Client;
use Src\Infrastructure\Repository\Client\ClientRepository;

final readonly class ClientsSearcherService {
    private ClientRepository $repository;

    public function __construct() {
        $this->repository = new ClientRepository();
    }

    /** @return Client[] */
    public function search(): array
    {
        return $this->repository->search();
    }
}