<?php 

namespace Src\Infrastructure\Repository\ItemsOrder;

use Src\Entity\ItemsOrder\ItemsOrder;

interface ItemsOrderRepositoryInterface {


    public function find(int $id): ?ItemsOrder;
    public function search(): array;
    public function create(ItemsOrder $ItemsOrder): void;
    public function update(ItemsOrder $ItemsOrder): void;

    /** @return ItemsOrder[] */

}

