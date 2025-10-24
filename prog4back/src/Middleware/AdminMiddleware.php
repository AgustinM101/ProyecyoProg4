<?php 

declare(strict_types=1);

namespace Src\Middleware;

use Src\Infrastructure\Repository\User\UserRepository;
use Src\Service\User\UserTokenValidatorService;
use Exception;

final class AdminMiddleware {

    private UserRepository $userRepository;
    private UserTokenValidatorService $tokenValidator;

    public function __construct() {
        $this->userRepository = new UserRepository();
        $this->tokenValidator = new UserTokenValidatorService();

        $this->validateAdmin();
    }

    private function validateAdmin(): void {
        $token = $_SERVER["HTTP_X_API_KEY"] ?? "";

        if (empty($token)) {
            throw new Exception("Token no proporcionado");
        }

        // Validar token y obtener user_id
        $decoded = $this->tokenValidator->validate($token);
        $userId = $decoded->user_id ?? ($decoded["user_id"] ?? null);

        if (!$userId) {
            throw new Exception("Token inválido o sin ID de usuario");
        }

        // Buscar usuario en DB
        $user = $this->userRepository->findById((int) $userId);

        if (!$user) {
            throw new Exception("Usuario no encontrado");
        }

        // Verificar admin
        if ((int) $user->admin() !== 1) {
            throw new Exception("Acceso restringido a administradores");
        }
    }
}
