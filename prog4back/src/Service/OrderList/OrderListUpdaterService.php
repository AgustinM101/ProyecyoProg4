<?php

namespace Src\Service\OrderList;

use Src\Entity\OrderList\OrderList;
use Src\Infrastructure\Repository\OrderList\OrderListRepository;

final readonly class OrderListUpdaterService{

    private OrderListRepository $repository;

    private OrderListFinderService $finderService;

    public function __construct() {
        $this->repository = new OrderListRepository();
        $this->finderService = new OrderListFinderService();
    }
    public function update(int $id_user, date $date, int $total, string $status, int $id): void{

        $orderlist = $this->finderService->find($id);
        $orderlist->modify($id_user, $date, $total, $status);

        $this->repository->update($orderlist);
    }
    
}