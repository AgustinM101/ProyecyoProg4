<?php 

namespace Src\Service\OrderList;

use Src\Entity\OrderList\OrderList;
use Src\Infrastructure\Repository\OrderList\OrderListRepository;

final readonly class OrderListsSearcherService {
    private OrderListRepository $repository;

    public function __construct() {
        $this->repository = new OrderListRepository();
    }

    /** @return OrderList[] */
    public function search(): array
    {
        return $this->repository->search();
    }
}