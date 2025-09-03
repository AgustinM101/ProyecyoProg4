<?php

namespace Src\Service\OrdersList;

use Src\Entity\OrderList\OrderList;
use Src\Infrastructure\Repository\OrderList\OrderListRepository;

final readonly class OrderListDeleterService{

    private OrderListRepository $repository;

    private OrderListFinderService $finderService;

    public function __construct() {
        $this->repository = new OrderListRepository();
        $this->finderService = new OrderListFinderService();
    }
    
    public function delete(int $id): void{


        $orderlist = $this->finderService->find($id);
        $orderlist->delete();

        $this->repository->update($orderlist);
    }
    
}