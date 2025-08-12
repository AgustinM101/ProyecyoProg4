<?php 

use Src\Service\User\UserJwtValidatorService;

final readonly class AuthMiddlewareController {

    private UserJwtValidatorService $service;

    public function __construct() {
        $this->service = new UserJwtValidatorService ();
    }
    public function validate(string $token, string $token_expiration_date): void
    {
        $user = $this->service->findByToken($token, $token_expiration_date);
        
        if ($user === null) {
            http_response_code(401);
            echo json_encode(["error" => "usuario no autorizado"]);
            exit;
        }

        echo json_encode([
            "id" => $user->id(),
            "name" => $user->name(),
            "email" => $user->email(),
            "token" => $user->token(),
            "token_expiration_date" => $user->token_expiration_date()
        ]);
    }







}
