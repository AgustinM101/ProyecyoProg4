<?php

namespace Src\Service\ItemsOrder;

use Src\Entity\ItemsOrder\ItemsOrder;
use Src\Infrastructure\Repository\ItemsOrder\ItemsOrderRepository;

final readonly class ItemsOrderCreatorService{

    private ItemsOrderRepository $repository;

    public function __construct() {
        $this->repository = new ItemsOrderrepository();
    }
    public function create(int $id_order, int $id_plan, int $quantity, string $unit_price): void{
        $itemsorder = ItemsOrder::create($id_order, $id_plan, $quantity, $unit_price);
        $this->repository->create($itemsorder);
    }
    
}