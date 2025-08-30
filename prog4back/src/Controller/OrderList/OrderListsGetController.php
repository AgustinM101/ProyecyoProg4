<?php 

use Src\Service\OrderList\OrderListsSearcherService;

final readonly class OrderListsGetController {
    private OrderListsSearcherService $service;

    public function __construct() {
        $this->service = new OrderListsSearcherService();
    }

    public function start(): void
    {
        $orderLists = $this->service->search();

        echo json_encode($this->toResponse($orderLists));
    }

    private function toResponse(array $orderLists): array 
    {
        $responses = [];
        
        foreach($orderLists as $orderList) {
            $responses[] = [
                "id" => $orderList->id(),
                "id_user" => $orderList->id_user(),
                "date" => $orderList->date(),
                "total" => $orderList->total(),
                "status" => $orderList->status()
            ];
        }

        return $responses;
    }
}