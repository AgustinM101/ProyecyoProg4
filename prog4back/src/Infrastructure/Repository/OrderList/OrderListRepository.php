<?php 

namespace Src\Infrastructure\Repository\OrderList;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\OrderList\OrderList;

final readonly class OrderListRepository extends PDOManager implements OrderListRepositoryInterface {
    public function find(int $id): ?OrderList
    {
        $query = <<<HEREDOC
                        SELECT 
                            *
                        FROM
                            OrderList A
                        WHERE
                            A.id = :id
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
                            *
                        FROM
                            OrderList A
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
                        INSERT INTO OrderList (date, total, status, deleted)
                        VALUES (:date, :total, :status, :deleted)
                        INSERT_QUERY;
        
        $parameters = [
            "date" => $OrderList->date(),
            "total" => $OrderList->total(),
            "status" => $OrderList->status(),
            "deleted" => $OrderList->deleted()
        ];

        $this->execute($query, $parameters);
    }

    public function update(OrderList $OrderList): void
    {
        $query = <<< UPDATE_QUERY
                        UPDATE OrderList
                        SET date = :date, total = :total, status = :status, deleted = :deleted
                        WHERE id = :id
                        UPDATE_QUERY;

        $parameters = [
            "id" => $OrderList->id(),
            "date" => $OrderList->date(),
            "total" => $OrderList->total(),
            "status" => $OrderList->status(),
            "deleted" => $OrderList->deleted(),
        ];

        $this->execute($query, $parameters);
    }
    private function toOrderList(?array $primitive): ?OrderList {
        if ($primitive === null) {
            return null;
        }

        return new OrderList(
            $primitive["id"],
            $primitive["date"],
            $primitive["total"],
            $primitive["status"],
            $primitive["deleted"]
        );
    }
}