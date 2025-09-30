<?php

use Src\Service\PlansUser\PlansUserFinderService;

final readonly class PlansUserGetByUserController {

    private PlansUserFinderService $service;

    public function __construct() {
        $this->service = new PlansUserFinderService();
    }

    // Recibe el parámetro id_user desde el router (ej: /plansUsers/5)
    public function start(int $id_user): void {

        // Obtenemos los planes de ese usuario con detalles
        $plansUsers = $this->service->findByUserWithDetails($id_user);

        if (empty($plansUsers)) {
            http_response_code(404);
            echo json_encode([
                "error" => "No se encontraron planes para este usuario"
            ]);
            return;
        }

        echo json_encode($plansUsers);
    }
}
