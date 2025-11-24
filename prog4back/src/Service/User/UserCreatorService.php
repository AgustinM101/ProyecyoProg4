<?php 

namespace Src\Service\User;

use Src\Entity\User\Exception\UserAlreadyExistsException;
use Src\Entity\User\User;
use Src\Infrastructure\Repository\User\UserRepository;
use Src\Utils\ControllerUtils;

final readonly class UserCreatorService {
    private UserRepository $repository;
    private UserFinderByEmailService $userFinderByEmailService;

    public function __construct() {
        $this->repository = new UserRepository();
        $this->userFinderByEmailService = new UserFinderByEmailService();
    }

    public function create(string $name, string $email, string $password): void
    {
        $user = $this->userFinderByEmailService->find($email);

        if (!empty($user)) {
            // Intento de crear un usuario que ya existe -> severity 2 (warning)
            // incluir datos del usuario encontrado para tener contexto en el log
            $existingInfo = sprintf("id: %s, name: %s, email: %s", $user->id ?? 'n/a', $user->name ?? 'n/a', $user->email ?? $email);
            ControllerUtils::logAction("Intento de crear usuario existente: {$existingInfo}", true, 2);
            throw new UserAlreadyExistsException();
        }

        $user = User::create($name, $email, $password);

        try {
            $this->repository->insert($user);
        } catch (\Throwable $e) {
            // Error al insertar en BD -> severity 3 (error crítico)
            ControllerUtils::logAction("Error al crear usuario $email: " . $e->getMessage(), true, 3);
            throw $e;
        }

        // Log de creación exitosa como actividad reciente -> severity 0 (info)
        ControllerUtils::logAction("Se creó un nuevo usuario: $name con email: $email", false);
    }
}