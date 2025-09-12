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
         $data = json_decode(file_get_contents('php://input'), true);
        $id_order =(int) ControllerUtils::getPost("id_order");
        $id_plan =(int) ControllerUtils::getPost("id_plan");
        $quantity =(int) ControllerUtils::getPost("quantity");
        $unit_price =(float) ControllerUtils::getPost("unit_price");

if (!$id_order || !$id_plan || !$quantity || !$unit_price) {
            echo json_encode([
                "status" => 400,
                "message" => "Faltan parámetros requeridos"
            ]);
            return;
        }

        // Llamada única
        $this->service->create($id_order, $id_plan, $quantity, $unit_price);

        echo json_encode([
            "status" => 201,
            "message" => "ItemsOrder creado correctamente"
        ]);
    }


}
