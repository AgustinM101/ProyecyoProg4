<?php

use Src\Service\PlansForm\PlansFormFinderByUserService;
use Src\Service\User\UserFinderByToken;
use Src\Utils\ControllerUtils;

final readonly class PlansFormGetByUserController {

    private PlansFormFinderByUserService $service;
    private UserFinderByToken $userFinder;

    public function __construct() {
        $this->service = new PlansFormFinderByUserService();
        $this->userFinder = new UserFinderByToken();
    }

    public function start(): void
    {
        // 🔹 Obtener token del header
        $token = ControllerUtils::getHeaderToken();

        if (!$token) {
            http_response_code(401);
            echo json_encode(["status" => 401, "message" => "Token not found"]);
            return;
        }

        // 🔹 Buscar usuario por token
        $user = $this->userFinder->find($token);

        if (!$user) {
            http_response_code(401);
            echo json_encode(["status" => 401, "message" => "Invalid or expired token"]);
            return;
        }

        // 🔹 Obtener forms de ese usuario
        $plansForms = $this->service->findFormByUserId($user->id());

        echo json_encode($plansForms);
    }
}
