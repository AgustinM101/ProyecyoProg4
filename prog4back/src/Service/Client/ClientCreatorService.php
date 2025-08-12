<?php

namespace Src\Service\Client;

use Src\Entity\Client\Client;
use Src\Infrastructure\Repository\Client\ClientRepository;

final readonly class ClientCreatorService{

    private ClientRepository $repository;

    public function __construct() {
        $this->repository = new Clientrepository();
    }
    public function create(int $dni, string $name, string $surname): void{
        $client = Client::create($dni, $name, $surname);
        $this->repository->create($client);
    }
    
}