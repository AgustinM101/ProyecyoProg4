<?php 

namespace Src\Service\Client;

use Src\Entity\Client\Client;
use Src\Infrastructure\Repository\Client\ClientRepository;
use Src\Entity\Client\Exception\ClientNotFoundException;

final readonly class ClientFinderService {

    private ClientRepository $repository;

    public function __construct() {
        $this->repository = new ClientRepository();
    }

    public function find(int $id): Client
    {   
        $client = $this->repository->find($id);

        if ($client === null) {
            throw new ClientNotFoundException($id);
        }

        return $client;
    }
}