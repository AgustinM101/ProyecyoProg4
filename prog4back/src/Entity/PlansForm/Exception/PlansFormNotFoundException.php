<?php 

namespace Src\Entity\PlansForm\Exception;

use Exception;

final class PlansFormNotFoundException extends Exception {
    public function __construct(int $id) {
        parent::__construct("No se encontro el plansForm correspondiente. Id: ".$id);
    }
}