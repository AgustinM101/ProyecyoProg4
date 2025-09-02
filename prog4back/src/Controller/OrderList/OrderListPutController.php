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
        $date = ControllerUtils::getPost("date");
        $total = ControllerUtils::getPost("total");
        $status = ControllerUtils::getPost("status");

        $orderList = $this->service->update($id_user, $date, $total, $status, $id);
    }


}