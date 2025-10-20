<?php

namespace Src\Infrastructure\Repository\Log;

use Src\Entity\Log\Log;

interface LogRepositoryInterface
{
    /** @return Log[] */
    public function findAll(): array;

    public function findById(int $id): ?Log;

    public function create(Log $log): void;
 

    public function delete(int $id): void;

}

