<?php

namespace Src\Service\Log;

use Src\Infrastructure\Repository\Log\LogRepository;

final class LogFinderService
{
    private LogRepository $repository;

    public function __construct()
    {
        $this->repository = new LogRepository();
    }

    /** @return array */
    public function findAll(): array
    {
        return $this->repository->findAll();
    }
}
