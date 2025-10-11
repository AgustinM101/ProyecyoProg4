<?php

namespace Src\Infrastructure\Repository\PlansUser;

use Src\Entity\PlansUser\PlansUser;

interface PlansUserRepositoryInterface {
    public function searchPlans(): array;
    public function findAllWithDetails(): array;
    public function findByUserWithDetails(int $id_user): array;
    public function findByUserId(int $userId): array;
    public function assignPlan(PlansUser $plansUser): void;
    public function findById(int $id): ?PlansUser;

    public function updateStatusAndExpirationById(int $id, string $status, string $expiration_date): void;
    public function removePlanById(int $id): void;
}

