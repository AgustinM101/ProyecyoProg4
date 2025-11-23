<?php 

use Src\Utils\ControllerUtils;
use Src\Infrastructure\Repository\User\UserRepository;

final readonly class UserUpdateProfileController {

    private UserRepository $userRepository;

    public function __construct() {
        $this->userRepository = new UserRepository();
    }

    public function start(): void
    {
        try {
            $token = ControllerUtils::getHeaderToken();

            if (!$token) {
                http_response_code(401);
                echo json_encode(["message" => "Token not found"]);
                return;
            }

            $user = $this->userRepository->findByToken($token);
            if (!$user) {
                http_response_code(401);
                echo json_encode(["message" => "Invalid token"]);
                return;
            }

            
            // Recibir datos desde FormData
           $name  = $_POST['name'] ?? null;
           $email = $_POST['email'] ?? null;



            if ($name)  $user->setName($name);
            if ($email) $user->setEmail($email);

            // Guardar en BD (update tradicional)
            $this->userRepository->update($user);

            echo json_encode([
                "message" => "Perfil actualizado correctamente",
                "data" => [
                    "id"    => $user->id(),
                    "name"  => $user->name(),
                    "email" => $user->email(),
                    "admin" => $user->admin(),
                ]
            ]);

        } catch (\Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => $e->getMessage()]);
        }
        
    }
}


