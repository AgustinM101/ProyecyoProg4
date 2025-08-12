<?php 

namespace Src\Entity\Brand\Exception;

use Exception;

final class BrandNotFoundException extends Exception {
    public function __construct(int $id) {
        parent::__construct("No se encontro la marca correspondiente. Id: ".$id);
    }
}