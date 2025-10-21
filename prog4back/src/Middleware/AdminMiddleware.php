<?php 

declare(strict_types=1);

namespace Src\Middleware;

use Src\Middleware\AuthMiddleware;
use Src\Infrastructure\Repository\User\UserRepository;
use Src\Service\User\UserTokenValidatorService;
use Exception;

final readonly class AdminMiddleware {

    private AuthMiddleware $auth;
    private UserRepository $userRepository;
    private UserTokenValidatorService $tokenValidator;

    public function __construct() {
        // Primero validamos el token (usa tu AuthMiddleware existente)
        $this->auth = new AuthMiddleware();

        $this->userRepository = new UserRepository();
        $this->tokenValidator = new UserTokenValidatorService();

        $this->validateAdmin();
    }

    private function validateAdmin(): void 
    {
        // Obtener el token del header
        $token = $_SERVER["HTTP_X_API_KEY"] ?? "";

        // Validar el token y obtener los datos del usuario
        $decoded = $this->tokenValidator->validate($token);

        // Si el validador devuelve un objeto o array, adaptamos:
        $userId = $decoded->user_id ?? $decoded["user_id"] ?? null;

        if (!$userId) {
            throw new Exception("Token inválido: no contiene ID de usuario");
        }

        // Buscar al usuario en la base de datos
        $user = $this->userRepository->findById((int) $userId);

        if (!$user) {
            http_response_code(404);
            echo json_encode(["error" => "Usuario no encontrado"]);
            exit;
        }

        // Validar si es admin
        if ((int) $user->admin !== 1) {
            http_response_code(403);
            echo json_encode(["error" => "Acceso restringido a administradores"]);
            exit;
        }
    }
}
