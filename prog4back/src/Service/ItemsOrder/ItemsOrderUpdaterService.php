<?php

namespace Src\Service\ItemsOrder;

use Src\Entity\ItemsOrder\ItemsOrder;
use Src\Infrastructure\Repository\ItemsOrder\ItemsOrderRepository;

final readonly class ItemsOrderUpdaterService{

    private ItemsOrderRepository $repository;

    private ItemsOrderFinderService $finderService;

    public function __construct() {
        $this->repository = new ItemsOrderRepository();
        $this->finderService = new ItemsOrderFinderService();
    }
    public function update(int $id_detalle, int $id_order, int $id_plan, int $quantity, string $unit_price): void{

        $itemsorder = $this->finderService->find($id_detalle);
        $itemsorder->modify( $id_order, $id_plan, $quantity, $unit_price);

        $this->repository->update($itemsorder);
    }
    
}