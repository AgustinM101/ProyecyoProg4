<?php

use Src\Utils\ControllerUtils;
use Src\Service\User\UserLoginService;

final readonly class UserLoginController {
    private UserLoginService $service;

    public function __construct() {
        $this->service = new UserLoginService();
    }

    public function start(): void
    {
        try {
            $email = ControllerUtils::getPost("email");
            $password = ControllerUtils::getPost("password");

            // Intentar login
            $user = $this->service->login($email, $password);

            if (!$user) {
                http_response_code(401);
                echo json_encode(["message" => "Credenciales inválidas"]);
                return;
            }

            // Devolver token + info del usuario
            echo json_encode([
                "token" => $user->token(),
                "expiration_date" => $user->tokenAuthDate()->format("Y-m-d H:i:s"),
                "user" => [
                    "id" => $user->id(),
                    "name" => $user->name(),
                    "email" => $user->email(),
                    "phone" => $user->phone() ?? null,
                    "plan" => $user->plan() ? [
                        "id" => $user->plan()->id(),
                        "name" => $user->plan()->name(),
                        "description" => $user->plan()->description(),
                        "price" => $user->plan()->price()
                    ] : null
                ]
            ]);

        } catch (\Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => $e->getMessage()]);
        }
    }
}
