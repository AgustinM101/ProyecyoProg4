<?php

namespace Src\Service\OrderList;

use Src\Entity\OrderList\OrderList;
use Src\Infrastructure\Repository\OrderList\OrderListRepository;

final readonly class OrderListCreatorService{

    private OrderListRepository $repository;

    public function __construct() {
        $this->repository = new OrderListrepository();
    }
    public function create(int $id_user, date $date, int $total, string $status): void{
        $orderlist = OrderList::create($id_user, $date, $total, $status);
        $this->repository->create($orderlist);
    }
    
}