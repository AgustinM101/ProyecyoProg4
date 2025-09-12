<?php

namespace Src\Service\ItemsOrder;

use Src\Entity\ItemsOrder\ItemsOrder;
use Src\Infrastructure\Repository\ItemsOrder\ItemsOrderRepository;

final readonly class ItemsOrderDeleterService{

    private ItemsOrderRepository $repository;

    private ItemsOrderFinderService $finderService;

    public function __construct() {
        $this->repository = new ItemsOrderRepository();
        $this->finderService = new ItemsOrderFinderService();
    }
    
   public function delete(int $id_detalle): void {
    $query = <<<SQL
        UPDATE items_orders
        SET deleted = 1
        WHERE id_detalle = :id_detalle
    SQL;

    $parameters = [
        "id_detalle" => $id_detalle
    ];

    $this->repository->execute($query, $parameters);
}
}