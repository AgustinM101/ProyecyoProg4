<?php 

namespace Src\Entity\PlansUser\Exception;

use Exception;

final class PlansUserNotFoundException extends Exception {
    public function __construct(int $id) {
        parent::__construct("No se encontro el PlansUser correspondiente. Id: ".$id);
    }
}