<?php

use Src\Utils\ControllerUtils;
use Src\Service\OrderList\OrderListCreatorService;

final readonly class OrderListPostController
{
    private OrderListCreatorService $service;

    public function __construct() {
        $this->service = new OrderListCreatorService();
    }

    public function start(): void {
        $id_user = ControllerUtils::getPost("id_user");
        $date = new \DateTime(ControllerUtils::getPost("date"));
        $total = ControllerUtils::getPost("total");
        $status = ControllerUtils::getPost("status");

        $orderList = $this->service->create($id_user, $date, $total, $status);

    }


}
