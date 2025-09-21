<?php

namespace Src\Controller\PlansUser;

use Src\Service\PlansUser\PlansUserFinderService;

final readonly class PlansUserGetAllController {

    private PlansUserFinderService $service;

    public function __construct() {
        $this->service = new PlansUserFinderService();
    }

    public function start(): void {
        // Esto te sirve para confirmar que entró al controlador correcto
        var_dump('entro al controlador de PlansUser'); 
        exit;

        // Código normal (luego de probar, sacás el var_dump y exit)
        $plansUsers = $this->service->findAll();
        echo json_encode($this->toResponse($plansUsers));
    }

    private function toResponse(array $plansUsers): array {
        $responses = [];

        foreach ($plansUsers as $plansUser) {
            $responses[] = [
                "id_user" => $plansUser->id_user(),
                "id_plan" => $plansUser->id_plan(),
                "status" => $plansUser->status()
            ];
        }

        return $responses;
    }
}
