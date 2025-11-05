<?php

namespace Src\Service\PlansForm;

use Src\Infrastructure\Repository\PlansForm\PlansFormRepository;

final readonly class PlansFormFinderByUserService {
    private PlansFormRepository $repo;

    public function __construct() {
        $this->repo = new PlansFormRepository();
    }

    // Nuevo método para traer forms por id_user
    public function findFormByUserId(int $id_user): array {
        return $this->repo->findByUserId($id_user);
    }
}
