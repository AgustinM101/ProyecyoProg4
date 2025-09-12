<?php 

namespace Src\Service\OrderList;

use Src\Entity\OrderList\OrderList;
use Src\Infrastructure\Repository\OrderList\OrderListRepository;
use Src\Entity\OrderList\Exception\OrderListNotFoundException;

final readonly class OrderListFinderService {

    private OrderListRepository $repository;

    public function __construct() {
        $this->repository = new OrderListRepository();
    }

    public function find(int $id): OrderList
    {   
        $orderlist = $this->repository->find($id);

        if ($orderlist === null) {
            throw new OrderListNotFoundException($id);
        }

        return $orderlist;
    }
}
