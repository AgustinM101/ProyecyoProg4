<?php

namespace Src\Service\User;

use Src\Entity\User\User;
use Src\Infrastructure\Repository\User\UserRepository;

final readonly class UserUpdaterService {

    private UserRepository $repository;
    private UserFinderService $finderService;

    public function __construct() {
        $this->repository = new UserRepository();
        $this->finderService = new UserFinderService();
    }

    /**
     * Actualiza el perfil de un usuario
     * 
     * @param int $userId ID del usuario a actualizar
     * @param string|null $name Nombre nuevo

     * @param string|null $profileImagePath Ruta de la foto de perfil
     * @return User Usuario actualizado
     */
    public function updateProfile(int $userId, ?string $name, ?string $profileImagePath): User {
        $user = $this->finderService->find($userId);

        if (!$user) {
            throw new \Exception("Usuario con ID $userId no encontrado.");
            ControllerUtils::logAction("Error al actualizar usuario: ID $userId no encontrado.", true,2);
        }

        // Actualizar campos si se envían
        if ($name !== null) $user->setName($name);

        if ($profileImagePath !== null) $user->setProfileImage($profileImagePath);

        // Guardar cambios en la base de datos
        $this->repository->update($user);
            // Registrar log
            ControllerUtils::logAction("Se actualizó el usuario {$user->name()} con email: {$user->email()}", false);
    
        return $user;
    }
}
