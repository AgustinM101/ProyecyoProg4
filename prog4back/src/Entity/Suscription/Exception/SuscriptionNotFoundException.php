<?php 

namespace Src\Entity\Suscription\Exception;

use Exception;

final class SuscriptionNotFoundException extends Exception {
    public function __construct(int $id) {
        parent::__construct("No se encontro la suscripcion  correspondiente. Id: ".$id);
    }
}