<?php 

namespace Src\Entity\Client\Exception;

use Exception;

final class ClientNotFoundException extends Exception {
    public function __construct(int $id) {
        parent::__construct("No se encontro el cliente correspondiente. Id: ".$id);
    }
}