<?php

namespace Src\Service\User;

use Src\Entity\User\User;
use Src\Infrastructure\Repository\User\UserRepository;

final readonly class UserDeleteService{

    private UserRepository $repository;

    private UserFinderService $finderService;

    public function __construct() {
        $this->repository = new UserRepository();
        $this->finderService = new UserFinderService();
    }
    
    public function delete(int $id): void{


        $user = $this->finderService->find($id);
        $this->repository->delete($id);

        $this->repository->update($user);
    }
    
}