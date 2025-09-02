<?php 

namespace Src\Entity\ItemsOrder\Exception;

use Exception;

final class ItemsOrderNotFoundException extends Exception {
    public function __construct(int $id) {
        parent::__construct("No se encontro la itemsorder correspondiente. Id: ".$id);
    }
}