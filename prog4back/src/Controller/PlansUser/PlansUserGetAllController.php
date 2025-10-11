<?php

use Src\Service\PlansUser\PlansUserFinderService;

final readonly class PlansUserGetAllController {

    private PlansUserFinderService $service;

    public function __construct() {
        $this->service = new PlansUserFinderService();
    }

    public function start(): void {
        // Trae todos los planes de los usuarios con detalles completos
        $plansUsers = $this->service->findAllWithDetails();
        echo json_encode($this->toResponse($plansUsers));
    }

    private function toResponse(array $plansUsers): array {
        $responses = [];

        foreach ($plansUsers as $plansUser) {
            $responses[] = [
                "id"              => $plansUser["id"],
                "id_user"         => $plansUser["id_user"],
                "user_name"       => $plansUser["user_name"],
                "user_email"      => $plansUser["user_email"],
                "id_plan"         => $plansUser["id_plan"],
                "plan_name"       => $plansUser["plan_name"],
                "status"          => $plansUser["status"], // sigue siendo de plans_user
                "expiration_date" => $plansUser["expiration_date"] ?? null 
            ];
        }

        return $responses;
    }
}
