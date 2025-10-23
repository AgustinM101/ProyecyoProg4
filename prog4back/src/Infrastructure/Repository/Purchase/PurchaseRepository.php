<?php

namespace Src\Infrastructure\Repository\Purchase;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\Purchase\Purchase;

final readonly class PurchaseRepository extends PDOManager
{
    public function create(Purchase $purchase): void
{
    $query = <<<SQL
        INSERT INTO purchase_buy (amount, payment_method, status, preference_id, created_at, plans_user_id)
        VALUES (:amount, :payment_method, :status, :preference_id, :created_at, :plans_user_id)
    SQL;

    $plansUserId = $purchase->plansUserId() ?? null;

    $parameters = [
        'amount' => $purchase->amount(),
        'payment_method' => $purchase->paymentMethod(),
        'status' => $purchase->status(),
        'preference_id' => $purchase->preferenceId(),
        'created_at' => $purchase->createdAt(),
        'plans_user_id' => $plansUserId, // puede ser null sin romper
    ];

    $this->execute($query, $parameters);
}


    public function updateStatus(string $preferenceId, string $status): void
    {
        $query = <<<SQL
            UPDATE purchase_buy
            SET status = :status
            WHERE preference_id = :preference_id
        SQL;

        $parameters = [
            'status' => $status,
            'preference_id' => $preferenceId
        ];

        $this->execute($query, $parameters);
    }
}


