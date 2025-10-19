<?php 

namespace Src\Entity\Log\Exception;

use Exception;

final class LogNotFoundException extends Exception {
    public function __construct(int $id) {
        parent::__construct("No se encontro el log correspondiente. Id: ".$id);
    }
}