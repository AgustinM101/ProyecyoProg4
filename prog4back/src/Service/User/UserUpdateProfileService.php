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

    /**
     * Actualiza el perfil del usuario (nombre y email)
     *
     * @param int $userId
     * @param array $data ['name' => ..., 'email' => ...]
     * @throws \Exception
     */
    public function updateProfile(int $userId, array $data): void
    {
        $user = $this->userRepository->find($userId);
        if (!$user) {
            throw new \Exception("Usuario no encontrado");
        }

        if (isset($data['name'])) {
            $user->setName($data['name']);
        }

        if (isset($data['email'])) {
            $user->setEmail($data['email']);
        }

        // Guardar cambios en la base de datos
        $this->userRepository->update($user);
    }
}
