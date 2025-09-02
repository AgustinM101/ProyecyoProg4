<?php 

namespace Src\Entity\OrderList\Exception;

use Exception;

final class OrderListNotFoundException extends Exception {
    public function __construct(int $id) {
        parent::__construct("No se encontro la orden correspondiente. Id: ".$id);
    }
}