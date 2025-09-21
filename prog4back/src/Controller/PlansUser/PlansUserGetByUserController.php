<?php

namespace Src\Controller\PlansUser;

use Src\Service\PlansUser\PlansUserFinderService;

final readonly class PlansUserGetByUserController {

    private PlansUserFinderService $service;

    public function __construct() {
        $this->service = new PlansUserFinderService();
    }

    public function start(int $userId): void {
        $plans = $this->service->findByUser($userId);
        echo json_encode($this->toResponse($plans));
    }

    private function toResponse(array $plans): array {
        $responses = [];

        foreach ($plans as $plan) {
            $responses[] = [
                "id" => $plan->id(),
                "id_user" => $plan->id_user(),
                "id_plan" => $plan->id_plan(),
                "status" => $plan->status()
            ];
        }

        return $responses;
    }
}
