<?php

use Src\Utils\ControllerUtils;
use Src\Service\ItemsOrder\ItemsOrderCreatorService;

final readonly class ItemsOrderPostController
{
    private ItemsOrderCreatorService $service;

    public function __construct() {
        $this->service = new ItemsOrderCreatorService();
    }

    public function start(): void {
        $id_order = ControllerUtils::getPost("id_order");
        $id_plan = ControllerUtils::getPost("id_plan");
        $quantity = ControllerUtils::getPost("quantity");
        $unit_price = ControllerUtils::getPost("unit_price");

        $itemsOrder = $this->service->create($id_order, $id_plan, $quantity, $unit_price);

    }


}
