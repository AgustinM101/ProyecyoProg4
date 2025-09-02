<?php 

namespace Src\Entity\PlanAlimento\Exception;

use Exception;

final class PlanAlimentoNotFoundException extends Exception {
    public function __construct(int $id) {
        parent::__construct("No se encontro el plan correspondiente. Id: ".$id);
    }
}