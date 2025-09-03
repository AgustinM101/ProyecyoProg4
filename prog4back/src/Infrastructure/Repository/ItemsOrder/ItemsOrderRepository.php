<?php 

namespace Src\Infrastructure\Repository\ItemsOrder;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\ItemsOrder\ItemsOrder;

final readonly class ItemsOrderRepository extends PDOManager implements ItemsOrderRepositoryInterface {
    public function find(int $id): ?ItemsOrder
    {
        $query = <<<HEREDOC
                        SELECT 
                            *
                        FROM
                            ItemsOrder A
                        WHERE
                            A.id = :id 
                    HEREDOC;

        $parameters = [
            "id" => $id,
        ];

        $result = $this->execute($query, $parameters);

        return $this->toArticle($result[0] ?? null);
    }

    /** @return ItemsOrder[] */
    public function search(): array
    {
        $query = <<<HEREDOC
                        SELECT
                            *
                        FROM
                            ItemsOrder A
                    HEREDOC;
        
        $results = $this->execute($query);

        $ItemsOrders = [];
        foreach($results as $result) {
            $ItemsOrders[] = $this->toArticle($result);
        }

        return $ItemsOrders;
    }
    public function create(ItemsOrder $ItemsOrder): void{



        $query = <<< INSERT_QUERY
                        INSERT INTO ItemsOrder (quantity, unitPrice, deleted)
                        VALUES (:quantity, :unitPrice, :deleted)
                        INSERT_QUERY;
        
        $parameters = [
            "quantity" => $ItemsOrder->quantity(),
            "unitPrice" => $ItemsOrder->unitPrice(),
            "deleted" => $ItemsOrder->deleted()
           
            
        ];

        $this->execute($query, $parameters);
    }

    public function update(ItemsOrder $ItemsOrder): void
    {
        $query = <<<UPDATE_QUERY
                        UPDATE ItemsOrder
                        SET quantity = :quantity, unitPrice = :unitPrice, deleted = :deleted
                        WHERE id = :id
                    UPDATE_QUERY;

        $parameters = [
            "id" => $ItemsOrder->id(),
            "quantity" => $ItemsOrder->quantity(),
            "unitPrice" => $ItemsOrder->unitPrice(),
            "deleted" => $ItemsOrder->deleted()
        ];

        $this->execute($query, $parameters);
    }

    private function toItemsOrder(?array $primitive): ?ItemsOrder {
        if ($primitive === null) {
            return null;
        }

        return new ItemsOrder(
            $primitive["id"],
            $primitive["quantity"],
            $primitive["unitPrice"],
            $primitive["deleted"]
        );
    }

    private function toItemsOrder(?array $primitive): ?ItemsOrder {
        if ($primitive === null) {
            return null;
        }

        return new ItemsOrder(
            $primitive["id"],
            $primitive["quantity"],
            $primitive["unitPrice"],
            $primitive["deleted"]
        );
    }
}