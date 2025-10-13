<?php

namespace Src\Infrastructure\Repository\Subscription;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\Subscription\Subscription;

final readonly class SubscriptionRepository extends PDOManager implements SubscriptionRepositoryInterface {

    /** @return Subscription[] */
    public function search(): array {
        $query = <<<SQL
            SELECT id, id_user, id_plan, payment_method, purchase_date, status
            FROM subscriptions
        SQL;

        $results = $this->execute($query);

        $subscriptions = [];
        foreach ($results as $row) {
            $subscriptions[] = $this->toSubscription($row);
        }

        return $subscriptions;
    }

    public function findByUserId(int $id_user): array {
        $query = <<<SQL
            SELECT id, id_user, id_plan, payment_method, purchase_date, status
            FROM subscriptions
            WHERE id_user = :id_user
        SQL;

        $parameters = ["id_user" => $id_user];
        $results = $this->execute($query, $parameters);

        $subscriptions = [];
        foreach ($results as $row) {
            $subscriptions[] = $this->toSubscription($row);
        }

        return $subscriptions;
    }

    public function create(Subscription $subscription): void {
        $query = <<<SQL
            INSERT INTO subscriptions (id_user, id_plan, payment_method, purchase_date, status)
            VALUES (:id_user, :id_plan, :payment_method, :purchase_date, :status)
        SQL;

        $parameters = [
            "id_user"        => $subscription->id_user(),
            "id_plan"        => $subscription->id_plan(),
            "payment_method" => $subscription->paymentMethod(),
            "purchase_date"  => $subscription->purchaseDate()->format("Y-m-d H:i:s"),
            "status"         => $subscription->status()
        ];

        $this->execute($query, $parameters);
    }

    public function cancel(int $id): void {
        $query = <<<SQL
            UPDATE subscriptions
            SET status = 'cancelled'
            WHERE id = :id
        SQL;

        $parameters = ["id" => $id];
        $this->execute($query, $parameters);
    }

    private function toSubscription(?array $row): ?Subscription {
        if ($row === null) return null;

        return new Subscription(
            $row["id"],
            $row["id_user"],
            $row["id_plan"],
            $row["payment_method"],
            new \DateTime($row["purchase_date"]),
            $row["status"]
        );
    }
}
