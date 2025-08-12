<?php

namespace Src\Service\User;

use Src\Entity\Article\User;
use Src\Infrastructure\Repository\User\UserRepository;

final readonly class UserJwtValidatorService{

    private UserRepository $repository;

    private UserFinderService $finderService;

    public function __construct() {
        $this->repository = new UserRepository();
        $this->finderService = new UserFinderService();
    }
    public function findByToken(string $token, string $token_expiration_date): void{

    

        $user = $this->finderService->find($id);
        $jwt = md5(rand(1000, 9999))!;
        $user->modify($jwt, date("Y-m-d H:i:s", strtotime("+1 hour")));
        

        $this->repository->update($user);
    }
    
}