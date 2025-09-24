<?php

namespace Src\Infrastructure\Repository\PlansUser;

use Src\Entity\PlansUser\PlansUser;

interface PlansUserRepositoryInterface {

    /** @return PlansUser[] */
    public function searchplans(): array;

    /** @return PlansUser[] */
    public function findByUserId(int $userId): array;

    public function assignPlan(PlansUser $plansUser): void;

    public function removePlan(int $id_user, int $id_plan): void;
}
