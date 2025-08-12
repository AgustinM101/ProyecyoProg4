<?php

namespace Src\Service\User;

use Src\Entity\User\User;
use Src\Infrastructure\Repository\User\UserRepository;

final readonly class UserCreatorService{

    private UserRepository $repository;

    public function __construct() {
        $this->repository = new Userrepository();
    }
    public function create(string $name, string $email, string $password, string $token, date $token_expiration_date): void{
        $user = User::create($name, $email, $password,$token, $token_expiration_date);
        $this->repository->create($);
    }
    
