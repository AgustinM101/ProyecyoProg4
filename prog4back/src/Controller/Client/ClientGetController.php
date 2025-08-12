<?php 

use Src\Service\Client\ClientFinderService;

final readonly class ClientGetController {

    private ClientFinderService $service;

    public function __construct() {
        $this->service = new ClientFinderService();
    }

    public function start(int $id): void
    {
        $client = $this->service->find($id);
        
        echo json_encode([
            "id" => $client->id(),
            "dni" => $client->dni(),
            "name" => $client->name(),
            "surname" => $client->surname()
        ]);
    }
}