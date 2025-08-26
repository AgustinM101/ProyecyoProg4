<?php 

use Src\Utils\ControllerUtils;
use Src\Service\Domain\DomainUpdaterService;

final readonly class DomainPutController {
    private DomainUpdaterService $service;

    public function __construct() {
        $this->service = new DomainUpdaterService();
    }

    public function start(int $id): void
    {
        $name = ControllerUtils::getPost("name");
        $code = ControllerUtils::getPost("code");

        $this->service->update($name, $code, $id);
    }
}