<?php 

declare(strict_types=1);

namespace Src\Middleware;

use Src\Service\User\UserTokenValidatorService;

readonly class AuthMiddleware {

    private UserTokenValidatorService $userTokenValidatorService;

    public function __construct() {
        $this->userTokenValidatorService = new UserTokenValidatorService();
        $this->validateAuthorization();
    }

    private function validateAuthorization(): void 
    {
        $token = $_SERVER["HTTP_X_API_KEY"] ?? "";
        $this->userTokenValidatorService->validate($token);
    }
}