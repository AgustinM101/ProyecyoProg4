<?php 

namespace Src\Entity\Domain\Exception;

use Exception;

final class DomainNotFoundException extends Exception {
    public function __construct(int $id) {
        parent::__construct('No se encontro el dominio con id: '.$id);
    }
}