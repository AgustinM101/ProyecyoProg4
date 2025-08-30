<?php

use Src\Service\ItemsOrder\ItemsOrderDeleterService;

final readonly class ItemsOrderDeleteController
{
    private ItemsOrderDeleterService $service;


    public function __construct() {
        $this->service = new ItemsOrderDeleterService;
    }

    public function start(int $id): void {

    }

        $this->service->delete($id);
    }



