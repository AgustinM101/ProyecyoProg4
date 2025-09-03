<?php 

namespace Src\Service\ItemsOrder;

use Src\Entity\ItemsOrder\ItemsOrder;
use Src\Infrastructure\Repository\ItemsOrder\ItemsOrderRepository;
use Src\Entity\ItemsOrder\Exception\ItemsOrderNotFoundException;

final readonly class ItemsOrderFinderService {

    private ItemsOrderRepository $repository;

    public function __construct() {
        $this->repository = new ItemsOrderRepository();
    }

    public function find(int $id): ItemsOrder 
    {   
        $itemsorder = $this->repository->find($id);

        if ($itemsorder === null) {
            throw new ItemsOrderNotFoundException($id);
        }

        return $itemsorder;
    }
}