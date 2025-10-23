<?php



use Src\Middleware\AdminMiddleware;
use Src\Service\User\UserTokenValidatorService;
use Src\Infrastructure\Repository\User\UserRepository;

final readonly class AdminValidateController {
    private UserTokenValidatorService $tokenValidator;
    private UserRepository $userRepository;

    public function __construct() {
        // Esto ya valida token y admin; si no es admin, el middleware hace exit/respuesta 403
        new AdminMiddleware();

        $this->tokenValidator = new UserTokenValidatorService();
        $this->userRepository = new UserRepository();
    }

    public function start(): void {
        // Obtener token igual que en el middleware
        $token = $_SERVER["HTTP_X_API_KEY"] ?? "";

        // Decodificar para obtener user_id (adaptá si tu validate devuelve otra estructura)
        $decoded = $this->tokenValidator->validate($token);
        $userId = $decoded->user_id ?? $decoded["user_id"] ?? null;

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

        // Devolver datos mínimos (no pongas password ni campos sensibles)
        echo json_encode([
            "is_admin" => true,
            "user" => [
                "id" => $user->id ?? $user->getId() ?? null,
                "email" => $user->email ?? $user->getEmail() ?? null,
                "admin" => (int)$user->admin ?? (int)$user->isAdmin() ?? 1
            ]
        ]);
    }
}
