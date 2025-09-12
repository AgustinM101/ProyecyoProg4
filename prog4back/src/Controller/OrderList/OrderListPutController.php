<?php

use Src\Service\OrderList\OrderListUpdaterService;
use Src\Utils\ControllerUtils;

final readonly class OrderListPutController
{
    private OrderListUpdaterService $service;

    public function __construct() {
        $this->service = new OrderListUpdaterService;
    }

       public function start(int $id): void {
        $id_user = ControllerUtils::getPost("id_user");
        $dateString = ControllerUtils::getPost("date"); 
        $date = new \DateTime($dateString);             
        $total = ControllerUtils::getPost("total");
        $status = ControllerUtils::getPost("status");

        
        $orderList = $this->service->update($id, $date, $total, $status, $id_user);
    }


}