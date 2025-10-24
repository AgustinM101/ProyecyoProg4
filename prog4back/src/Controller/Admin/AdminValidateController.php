<?php

use Src\Middleware\AdminMiddleware;
use Src\Service\User\UserTokenValidatorService;
use Src\Infrastructure\Repository\User\UserRepository;

final readonly class AdminValidateController {
    private UserTokenValidatorService $tokenValidator;
    private UserRepository $userRepository;

    public function __construct() {
        $this->tokenValidator = new UserTokenValidatorService();
        $this->userRepository = new UserRepository();
    }

    public function start(): void {
        $token = $_SERVER["HTTP_X_API_KEY"] ?? "";

        try {
            // 🔹 Validar si el usuario es admin (lanza Exception si no)
            new AdminMiddleware();

            // 🔹 Obtener info del usuario
            $decoded = $this->tokenValidator->validate($token);
            $userId = $decoded->user_id ?? ($decoded["user_id"] ?? null);

            if (!$userId) {
                http_response_code(401);
                echo json_encode(["error" => "Token inválido"]);
                return;
            }

            $user = $this->userRepository->findById((int) $userId);
            if (!$user) {
                http_response_code(404);
                echo json_encode(["error" => "Usuario no encontrado"]);
                return;
            }

            // 🔹 Respuesta exitosa
            http_response_code(200);
            echo json_encode([
                "is_admin" => (int)$user->admin() === 1,
                "user" => [
                    "id" => $user->id(),
                    "email" => $user->email(),
                ]
            ]);
        } catch (Exception $e) {
            http_response_code(403);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
}
