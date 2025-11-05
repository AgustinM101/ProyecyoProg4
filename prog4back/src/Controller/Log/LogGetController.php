<?php

use Src\Service\Log\LogFinderService;

final readonly class LogGetController {

    private LogFinderService $service;

    public function __construct() {
        $this->service = new LogFinderService();
    }

    public function start(): void {
        $logs = $this->service->findAll();

        // ✅ Agregar header para que Axios interprete JSON real
        header('Content-Type: application/json; charset=utf-8');

        echo json_encode($this->toResponse($logs), JSON_UNESCAPED_UNICODE);
    }

    private function toResponse(array $logs): array {
        $responses = [];

        foreach ($logs as $log) {
            $responses[] = [
                "id"         => $log->id(),
                "text"       => $log->text(),
                "created_at" => $log->created_at(),
                "is_alert"   => $log->isAlert(),
                "severity"   => $log->severity()
            ];
        }

        return $responses;
    }
}
