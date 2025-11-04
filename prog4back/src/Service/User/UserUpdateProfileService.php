<?php

declare(strict_types=1);

namespace Src\Service\User;

use Src\Infrastructure\Repository\User\UserRepository;
use Src\Entity\User\User;

final class UserUpdateProfileService
{
    private UserRepository $userRepository;

    public function __construct()
    {
        $this->userRepository = new UserRepository();
    }

    public function updateProfile(int $userId, array $data): void
    {
        $user = $this->userRepository->find($userId);
        if (!$user) {
            throw new \Exception("Usuario no encontrado");
        }

        if (isset($data['name'])) {
            $user->setName($data['name']);
        }

        

        if (isset($data['profile_image'])) {
            $file = $data['profile_image'];
            $uploadDir = __DIR__ . '/../../../public/uploads/profile_images/';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }

            $filePath = $uploadDir . uniqid() . '_' . $file['name'];
            move_uploaded_file($file['tmp_name'], $filePath);

            // Guardamos la ruta relativa a la imagen
            $user->setProfileImage('/uploads/profile_images/' . basename($filePath));
        }

        $this->userRepository->update($user);
        
                // Registrar log después de la actualización
        ControllerUtils::logAction("Se actualizó la imagen del usuario: $name con email: $email", false);
    }
}

    