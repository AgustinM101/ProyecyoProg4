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
            $profileImage = $_FILES['profile_image'] ?? null;
            $profileImagePath = null;

            // Manejo de la imagen
            if ($profileImage && $profileImage['tmp_name']) {
                $uploadDir = __DIR__ . '/../../../../app/build/data/public/uploads/profile_images/';
                if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

                $uniqueName = uniqid('profile_') . '_' . basename($profileImage['name']);
                $filePath = $uploadDir . $uniqueName;

                if (move_uploaded_file($profileImage['tmp_name'], $filePath)) {
                    $profileImagePath = '/uploads/profile_images/' . $uniqueName;
                } else {
                    throw new \Exception("Error al mover el archivo subido.");
                }
            }

            // Actualizamos solo nombre e imagen
            $this->userRepository->updateProfile(
                $user->id(),
                $name ?? $user->name(),
                $profileImagePath ?? $user->profileImage()
            );

            // Refrescamos los datos para devolverlos al frontend
            $updatedUser = $this->userRepository->find($user->id());

            echo json_encode([
                "message" => "Perfil actualizado correctamente",
                "data" => [
                    "id" => $updatedUser->id(),
                    "name" => $updatedUser->name(),
                    "email" => $updatedUser->email(),
                    "profileImage" => $updatedUser->profileImage() ?? '',
                    "admin" => $updatedUser->admin()
                ]
            ]);

        } catch (\Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => $e->getMessage()]);
        }
    }
}

