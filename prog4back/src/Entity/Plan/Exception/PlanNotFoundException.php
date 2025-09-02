<?php 

namespace Src\Entity\Plan\Exception;

use Exception;

final class PlanNotFoundException extends Exception {
    public function __construct(int $id) {
        parent::__construct("No se encontro el plan correspondiente. Id: ".$id);
    }
}