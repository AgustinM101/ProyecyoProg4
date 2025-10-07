
<?php 

use Src\Infrastructure\Repository\User\UserRepository;

final readonly class UserGetController {

    private UserRepository $service;

    public function __construct() {
        $this->service = new UserRepository();
    }

    public function start(int $id): void
    {
        $user = $this->service->find($id);

        if (!$user) {
            http_response_code(404);
            echo json_encode([
                "error" => "Usuario no encontrado"
            ]);
            return;
        }

        echo json_encode([
            "id" => $user->id(),
            "name" => $user->name(),
            "email" => $user->email()
        ]);
    }
}