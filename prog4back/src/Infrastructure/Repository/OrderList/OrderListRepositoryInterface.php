<?php 

namespace Src\Infrastructure\Repository\OrderList;

use Src\Entity\OrderList\OrderList;

interface OrderListRepositoryInterface {
    public function find(int $id): ?OrderList;
    public function search(): array;
    public function create(OrderList $OrderList): void;
    public function update(OrderList $OrderList): void;

    /** @return OrderList[] */

}
