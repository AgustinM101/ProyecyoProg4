<?php

declare(strict_types=1);

namespace Src\Service\User;

use Src\Infrastructure\Repository\User\UserRepository;

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

        // Actualizar nombre si viene en los datos
        if (isset($data['name'])) {
            $user->setName($data['name']);
        }

        // Actualizar teléfono si viene en los datos
        if (isset($data['phone'])) {
            $user->setPhone($data['phone']);
        }

        // Actualizar foto de perfil si viene en los datos
        if (isset($data['profile_image'])) {
            $file = $data['profile_image'];

            // Usar ruta absoluta desde la raíz del servidor
            $uploadDir = $_SERVER['DOCUMENT_ROOT'] . '/app/build/data/public/uploads/profile_images/';

            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }

            // Generar nombre único para evitar conflictos
            $uniqueName = uniqid('profile_') . '_' . basename($file['name']);
            $filePath = $uploadDir . $uniqueName;

            if (!move_uploaded_file($file['tmp_name'], $filePath)) {
                throw new \Exception("Error al mover el archivo subido.");
            }

            // Guardamos la ruta relativa para el frontend
            $user->setProfileImage('/uploads/profile_images/' . $uniqueName);
        }

        // Guardar los cambios en la base de datos
        $this->userRepository->updateProfile(
        $user->id(),
        $user->name(),
        $user->profileImage()
);
    }
}


    