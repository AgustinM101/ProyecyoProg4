<?php

use Src\Service\ItemsOrder\ItemsOrderUpdaterService;
use Src\Utils\ControllerUtils;

final readonly class ItemsOrderPutController
{
    private ItemsOrderUpdaterService $service;

    public function __construct() {
        $this->service = new ItemsOrderUpdaterService;
    }

    public function start(int $id): void {
        $id_order = ControllerUtils::getPost("id_order");
        $id_plan = ControllerUtils::getPost("id_plan");
        $quantity = ControllerUtils::getPost("quantity");
        $unit_price = ControllerUtils::getPost("unit_price");
        


        $itemsOrder = $this->service->update($id_order, $id_plan, $quantity, $unit_price, $id);
    }


}
