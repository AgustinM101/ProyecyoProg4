<?php

namespace Src\Service\User;

use Src\Entity\User\User;
use Src\Infrastructure\Repository\User\UserRepository;
use Src\Utils\ControllerUtils;

final readonly class UserDeleteService {

    private UserRepository $repository;
    private UserFinderService $finderService;

    public function __construct() {
        $this->repository = new UserRepository();
        $this->finderService = new UserFinderService();
    }
    
    public function delete(int $id): void {
        
        $user = $this->finderService->find($id);

        if (!$user) {
            ControllerUtils::logAction("Se intentó eliminar un usuario inexistente con ID $id", true);
            return;
        }

        // Borrar el usuario
        $this->repository->delete($id);

        // Registrar log usando el nombre del usuario
        ControllerUtils::logAction("Se eliminó el usuario: {$user->name()}", true);
    }
}
