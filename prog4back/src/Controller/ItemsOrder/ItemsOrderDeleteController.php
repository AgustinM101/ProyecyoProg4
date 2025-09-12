<?php

use Src\Service\ItemsOrder\ItemsOrderDeleterService;

final readonly class ItemsOrderDeleteController
{
    private ItemsOrderDeleterService $service;


    public function __construct() {
        $this->service = new ItemsOrderDeleterService;
    }

    public function start(int $id_detalle): void {

        $this->service->delete($id_detalle);

    }

        
    }



