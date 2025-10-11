<?php

namespace Src\Infrastructure\Repository\Subscription;

use Src\Entity\Subscription\Subscription;

interface SubscriptionRepositoryInterface {

    /** @return Subscription[] */
    public function search(): array;

    /** @return Subscription[] */
    public function findByUserId(int $userId): array;

    /** Crea una nueva suscripción */
    public function create(Subscription $subscription): void;

    /** Cancela una suscripción existente */
    public function cancel(int $id): void;
}

