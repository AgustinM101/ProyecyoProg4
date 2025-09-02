<?php

use Src\Service\OrderList\OrderListDeleterService;

final readonly class OrderListDeleteController
{
    private OrderListDeleterService $service;


    public function __construct() {
        $this->service = new OrderListDeleterService;
    }

    public function start(int $id): void {

    

        $this->service->delete($id);
    }


}
