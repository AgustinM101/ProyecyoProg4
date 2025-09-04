<?php 

namespace Src\Service\ItemsOrder;

use Src\Entity\ItemsOrder\ItemsOrder;
use Src\Infrastructure\Repository\ItemsOrder\ItemsOrderRepository;

final readonly class ItemsOrdersSearcherService {
    private ItemsOrderRepository $repository;

    public function __construct() {
        $this->repository = new ItemsOrderRepository();
    }

    /** @return ItemsOrder[] */
    public function search(): array
    {
        return $this->repository->search();
    }
}