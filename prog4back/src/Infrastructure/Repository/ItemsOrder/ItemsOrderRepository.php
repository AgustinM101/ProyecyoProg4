<?php 

namespace Src\Infrastructure\Repository\ItemsOrder;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\ItemsOrder\ItemsOrder;

final readonly class ItemsOrderRepository extends PDOManager implements ItemsOrderRepositoryInterface {
    public function find(int $id_detalle): ?ItemsOrder
    {
        $query = <<<HEREDOC
                        SELECT 
                            *
                        FROM
                            items_orders 
                        WHERE
                            id_detalle = :id_detalle and deleted = 0
                    HEREDOC;

        $parameters = [
            "id_detalle" => $id_detalle,
        ];

        $result = $this->execute($query, $parameters);

        return $this->toItemsOrder($result[0] ?? null);
    }

    /** @return ItemsOrder[] */
    public function search(): array
    {
        $query = <<<HEREDOC
                        SELECT
                            *
                        FROM
                            items_orders WHERE and deleted = 0
                    HEREDOC;
        
        $results = $this->execute($query);

        $itemsOrder = [];
        foreach($results as $result) {
            $itemsOrder[] = $this->toItemsOrder($result);
        }

        return $itemsOrder;
    }
    public function create(ItemsOrder $itemsOrder): void{



        $query = <<< INSERT_QUERY
                        INSERT INTO items_orders (id_order, id_plan, quantity, unit_price)
                        VALUES (:id_order, :id_plan, :quantity, :unit_price)
                    INSERT_QUERY;
        
        $parameters = [
            "id_order" => $itemsOrder->id_order(),
            "id_plan" => $itemsOrder->id_plan(),
            "quantity" => $itemsOrder->quantity(),
            "unit_price" => $itemsOrder->unit_price()
            
           
            
        ];

        $this->execute($query, $parameters);
    }

    public function update(ItemsOrder $itemsOrder): void
    {
        $query = <<<UPDATE_QUERY
                        UPDATE items_orders
                        SET quantity = :quantity, unit_price = :unit_price
                        WHERE id_detalle = :id_detalle
                    UPDATE_QUERY;

        $parameters = [
            "id_detalle" => $itemsOrder->id_detalle(),
            "quantity" => $itemsOrder->quantity(),
            "unit_price" => $itemsOrder->unit_price()
            
        ];

        $this->execute($query, $parameters);
    }

    private function toItemsOrder(?array $primitive): ?ItemsOrder {
        if ($primitive === null) {
            return null;
        }

        return new ItemsOrder(
            $primitive["id_detalle"],
            $primitive["id_order"],
            $primitive["id_plan"],
            $primitive["quantity"],
            $primitive["unit_price"]
        
        );
    }

    
}