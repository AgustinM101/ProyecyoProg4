<?php 

namespace Src\Entity\PlanEjercicio\Exception;

use Exception;

final class PlanEjercicioNotFoundException extends Exception {
    public function __construct(int $id) {
        parent::__construct("No se encontro el plan correspondiente. Id: ".$id);
    }
}