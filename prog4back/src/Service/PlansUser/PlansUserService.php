<?php

class UsersPlanService {
    private $repo;

    public function __construct() {
        $this->repo = new UsersPlanRepository();
    }

    public function getUserPlans($userId) {
        return $this->repo->getPlansByUserId($userId);
    }

    public function addPlan($userId, $planId) {
        // validaciones de negocio
        return $this->repo->assignPlanToUser($userId, $planId);
    }

    public function removePlan($userId, $planId) {
        return $this->repo->removePlanFromUser($userId, $planId);
    }
}

