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

            $name = $_POST['name'] ?? null;
           
            $profileImage = $_FILES['profileImage'] ?? null;

            if ($name) $user->setName($name);
            

            if ($profileImage && $profileImage['tmp_name']) {
                $uploadDir = __DIR__ . '/../../uploads/profiles/';
                if (!file_exists($uploadDir)) mkdir($uploadDir, 0755, true);

                $filePath = $uploadDir . basename($profileImage['name']);
                move_uploaded_file($profileImage['tmp_name'], $filePath);

                // Guardamos la ruta relativa para usarla en la web
                $user->setProfileImage('/uploads/profiles/' . basename($profileImage['name']));
            }

            $this->userRepository->update($user);

            echo json_encode([
                "message" => "Perfil actualizado correctamente",
                "data" => [
                    "id" => $user->id(),
                    "name" => $user->name(),
                    "email" => $user->email(),
                    
                    "profileImage" => $user->profileImage(),
                    "admin" => $user->admin()
                ]
            ]);

        } catch (\Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => $e->getMessage()]);
        }
    }
}
