<?php 

use Src\Service\ItemsOrder\ItemsOrdersSearcherService;

final readonly class ItemsOrdersGetController {
    private ItemsOrdersSearcherService $service;

    public function __construct() {
        $this->service = new ItemsOrdersSearcherService();
    }

    public function start(): void
    {
        $itemsOrders = $this->service->search();

        echo json_encode($this->toResponse($itemsOrders));
    }

    private function toResponse(array $itemsOrders): array 
    {
        $responses = [];
        
        foreach($itemsOrders as $itemsOrder) {
            $responses[] = [
                "id" => $itemsOrder->id(),
                "name" => $itemsOrder->name(),
                "code" => $itemsOrder->code(),
            ];
        }

        return $responses;
    }
}