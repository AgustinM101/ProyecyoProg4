<?php

use Src\Service\Log\LogFinderService;

final readonly class LogGetController {

    private LogFinderService $service;

    public function __construct() {
        $this->service = new LogFinderService();
    }

    public function start(): void {
        $logs = $this->service->findAll();
        echo json_encode($this->toResponse($logs));
    }

    private function toResponse(array $logs): array {
        $responses = [];

         foreach ($logs as $log) {
        $responses[] = [
            "id" => $log->id(),
            "text" => $log->text(),
            "created_at" => $log->created_at(),
            "is_alert" => $log->isAlert()
            ];
        }

        return $responses;
    }
}

