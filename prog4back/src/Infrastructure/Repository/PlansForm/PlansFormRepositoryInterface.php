<?php 

namespace Src\Infrastructure\Repository\PlansForm;

use Src\Entity\PlansForm\PlansForm;

interface PlansFormRepositoryInterface
{
    public function find(int $id): ?PlansForm;

    public function search(): array;
    public function create(PlansForm $plansForm): PlansForm;
    public function update(PlansForm $plansForm): void;
    public function delete(int $id): void;


}