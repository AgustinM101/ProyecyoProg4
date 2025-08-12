<?php 

namespace Src\Infrastructure\Repository\Client;

use Src\Entity\Client\Client;

interface ClientRepositoryInterface {
    
    public function find(int $id): ?Client;
    public function search(): array;
    public function delete(Client $client): void;
    public function update(Client $client): void;
    public function create(Client $client): void;

        /** @return Client[] */

}

