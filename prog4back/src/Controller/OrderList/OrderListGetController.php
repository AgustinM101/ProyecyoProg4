<?php 

use Src\Service\OrderList\OrderListFinderService;

final readonly class OrderListGetController {

    private OrderListFinderService $service;

    public function __construct() {
        $this->service = new OrderListFinderService();
    }

    public function start(int $id): void
    {
        $orderList = $this->service->find($id);
        
        echo json_encode([
            "id" => $orderList->id(),
            "id_user" => $orderList->id_user(),
            "date" => $orderList->date(),
            "total" => $orderList->total(),
            "status" => $orderList->status(),
        ]);
    }
}