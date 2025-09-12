<?php 

namespace Src\Infrastructure\Repository\OrderList;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\OrderList\OrderList;

final readonly class OrderListRepository extends PDOManager implements OrderListRepositoryInterface {
    public function find(int $id): ?OrderList
    {
        $query = <<<HEREDOC
                        SELECT 
                            id,id_user, date, total, status
                        FROM
                            order_lists A
                        WHERE
                            A.id = :id AND deleted = 0
                    HEREDOC;

        $parameters = [
            "id" => $id,
        ];

        $result = $this->execute($query, $parameters);

        return $this->toOrderList($result[0] ?? null);
    }

    /** @return OrderList[] */
    public function search(): array
    {
        $query = <<<HEREDOC
                        SELECT
                            id,id_user, date, total, status
                        FROM
                            order_lists A WHERE deleted = 0
                    
                    HEREDOC;
        
        $results = $this->execute($query);

        $OrderLists = [];
        foreach($results as $result) {
            $OrderLists[] = $this->toOrderList($result);
        }

        return $OrderLists;
    }
    public function create(OrderList $OrderList): void{



        $query = <<< INSERT_QUERY
                        INSERT INTO order_lists (id_user, date, total, status )
                        VALUES (:id_user, :date, :total, :status)
                        INSERT_QUERY;
        
        $parameters = [
            "id_user" => $OrderList->id_user(),
            "date" => $OrderList->date()->format('Y-m-d'),
            "total" => $OrderList->total(),
            "status" => $OrderList->status()
            
        ];

        $this->execute($query, $parameters);
    }

    public function update(OrderList $OrderList): void
    {
        $query = <<< UPDATE_QUERY
                        UPDATE order_lists
                        SET id_user=:id_user, date = :date, total = :total, status = :status
                        WHERE id = :id
                        UPDATE_QUERY;

        $parameters = [
            "id" => $OrderList->id(),
            "id_user" => $OrderList->id_user(),
            "date" => $OrderList->date()->format('Y-m-d'),
            "total" => $OrderList->total(),
            "status" => $OrderList->status(),
            
        ];

        $this->execute($query, $parameters);
    }
    private function toOrderList(?array $primitive): ?OrderList {
        if ($primitive === null) {
            return null;
        }

        return new OrderList(
            $primitive["id"],
            (int)$primitive["id_user"],
            new \DateTime($primitive["date"]),
            $primitive["total"],
            $primitive["status"]
        );
    }
}