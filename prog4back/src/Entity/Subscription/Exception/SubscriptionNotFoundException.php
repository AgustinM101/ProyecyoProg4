<?php 

namespace Src\Entity\Suscription\Exception;

use Exception;

final class SuscriptionNotFoundException extends Exception {
    public function __construct(int $id) {
        parent::__construct("No se encontro el Suscription correspondiente. Id: ".$id);
    }
}