<?php

namespace Src\Service\Client;

use Src\Entity\Client\Client;
use Src\Infrastructure\Repository\Client\ClientRepository;

final readonly class ClientDeleterService{

    private ClientRepository $repository;

    private ClientFinderService $finderService;

    public function __construct() {
        $this->repository = new ClientRepository();
        $this->finderService = new ClientFinderService();
    }
    
    public function delete(int $id): void{

        $client = $this->finderService->find($id);
        $this->repository->delete($client);
    }
    
}