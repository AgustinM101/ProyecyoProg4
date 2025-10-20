<?php

use Src\Utils\ControllerUtils;
use Src\Service\Log\LogCreatorService;

final readonly class LogPostController
{
    private LogCreatorService $service;

    public function __construct() {
        $this->service = new LogCreatorService();
    }

    public function start(): void {
        $text = ControllerUtils::getPost("text");
        $isAlert = ControllerUtils::getPost("isAlert");

        $this->service->create($text, $isAlert);

        echo json_encode(["status" => "ok"]);
    }
}

