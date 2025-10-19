<?php

namespace Src\Controller\User;

use Src\Service\User\UserUpdaterService;
use Src\Service\User\UserFinderService;
use Src\Utils\ControllerUtils;

final readonly class UserPutController {
    private UserUpdaterService $service;
    private UserFinderService $finderService;

    public function __construct() {
        $this->service = new UserUpdaterService();
        $this->finderService = new UserFinderService();
    }

    public function start(): void {
        // Obtener usuario logueado desde token
        try {
            $token = ControllerUtils::getHeaderToken();
            $user = $this->finderService->findByToken($token);

            if (!$user) {
                http_response_code(401);
                echo json_encode(["status" => 401, "message" => "Token inválido"]);
                return;
            }

            // Obtener campos enviados
            $name = ControllerUtils::getPost("name", false, $user->name());
            

            // Manejo de imagen de perfil
            $profileImage = $_FILES['profileImage'] ?? null;
            $profileImagePath = $user->profileImage(); // valor actual

            if ($profileImage && $profileImage['error'] === 0) {
                // Crear carpeta si no existe
                $uploadDir = __DIR__ . "/../../uploads/profiles/";
                if (!is_dir($uploadDir)) {
                    mkdir($uploadDir, 0755, true);
                }

                // Mover archivo subido
                $filename = uniqid() . "_" . basename($profileImage['name']);
                move_uploaded_file($profileImage['tmp_name'], $uploadDir . $filename);
                $profileImagePath = "/uploads/profiles/" . $filename;
            }

            // Actualizar usuario en DB
            $updatedUser = $this->service->updateProfile($user->id(), $name, $phone, $profileImagePath);

            // Devolver usuario actualizado
            echo json_encode([
                "id" => $updatedUser->id(),
                "name" => $updatedUser->name(),
                "email" => $updatedUser->email(),

                "profileImage" => $updatedUser->profileImage(),
                "plan" => $updatedUser->plan() ? [
                    "id" => $updatedUser->plan()->id(),
                    "name" => $updatedUser->plan()->name(),
                    "description" => $updatedUser->plan()->description(),
                    "price" => $updatedUser->plan()->price()
                ] : null
            ]);
        } catch (\Exception $e) {
            http_response_code(400);
            echo json_encode(["status" => 400, "message" => $e->getMessage()]);
        }
    }
}

