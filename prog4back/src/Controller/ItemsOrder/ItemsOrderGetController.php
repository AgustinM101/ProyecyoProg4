<?php 

use Src\Service\ItemsOrder\ItemOrderFinderService;

final readonly class ItemsOrderGetController {

    private ItemsOrderFinderService $service;

    public function __construct() {
        $this->service = new ItemsOrderFinderService();
    }

    public function start(int $id): void
    {
        $itemsOrder = $this->service->find($id);
        
        echo json_encode([
            "id_detalle" => $itemsOrder->id_detalle(),
            "id_order" => $itemsOrder->id_order(),
            "id_plan" => $itemsOrder->id_plan(),
            "quantity" => $itemsOrder->quantity(),
            "unit_price" => $itemsOrder->unit_price()
        ]);
    }
}