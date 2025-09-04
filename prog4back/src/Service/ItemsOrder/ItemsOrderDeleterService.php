<?php

namespace Src\Service\ItemsOrder;

use Src\Entity\ItemsOrder\ItemsOrder;
use Src\Infrastructure\Repository\ItemsOrder\ItemsOrderRepository;

final readonly class ItemsOrderDeleterService{

    private ItemsOrderRepository $repository;

    private ItemsOrderFinderService $finderService;

    public function __construct() {
        $this->repository = new ItemsOrderRepository();
        $this->finderService = new ItemsOrderFinderService();
    }
    
    public function delete(int $id): void{


        $itemsorder = $this->finderService->find($id);
        $itemsorder->delete();

        $this->repository->update($itemsorder);
    }
    
}