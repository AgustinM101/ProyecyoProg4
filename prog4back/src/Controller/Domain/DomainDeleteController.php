<?php 

use Src\Service\Domain\DomainDeleterService;

final readonly class DomainDeleteController {
    private DomainDeleterService $service;

    public function __construct() {
        $this->service = new DomainDeleterService();
    }

    public function start(int $id): void
    {
        $this->service->delete($id);
    }
}