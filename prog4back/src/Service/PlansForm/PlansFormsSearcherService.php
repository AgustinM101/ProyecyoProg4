<?php 

namespace Src\Service\PlansForm;

use Src\Entity\PlansForm\PlansForm;
use Src\Infrastructure\Repository\PlansForm\PlansFormRepository;

final readonly class PlansFormsSearcherService {
    private PlansFormRepository $repository;

    public function __construct() {
        $this->repository = new PlansFormRepository();
    }

    public function search(): array
    {
        return $this->repository->search();
    }
}