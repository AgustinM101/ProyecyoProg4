<?php 

use Src\Middleware\AuthMiddleware;
use Src\Service\Domain\DomainFinderService;

final readonly class DomainGetController extends AuthMiddleware {
    private DomainFinderService $service;

    public function __construct() {
        parent::__construct();
        $this->service = new DomainFinderService();
    }

    public function start(int $id): void 
    {
        $domain = $this->service->find($id);

        echo json_encode([
            "id" => $domain->id(),
            "name" => $domain->name(),
            "code" => $domain->code(),
        ], true);
    }
}
