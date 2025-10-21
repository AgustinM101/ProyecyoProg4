<?php

namespace Src\Service\Log;

use Src\Entity\Log\Log;
use Src\Infrastructure\Repository\Log\LogRepository;

final class LogCreatorService
{
    private LogRepository $repository;

    public function __construct()
    {
        $this->repository = new LogRepository();
    }

    public function create(string $text, bool $isAlert): void
    {
      
        $log = new Log(
            null, 
            $text,
            date("Y-m-d H:i:s"), 
            $isAlert
        );

       
        $this->repository->create($log);
    }
}
