
<?php

class UsersPlanController {
    private $service;

    public function __construct() {
        $this->service = new UsersPlanService();
    }

    public function getUserPlans($req, $res) {
        $userId = $req->params['id'];
        $plans = $this->service->getUserPlans($userId);
        return $res->json($plans);
    }

    public function addPlanToUser($req, $res) {
        $userId = $req->body['userId'];
        $planId = $req->body['planId'];
        $this->service->addPlan($userId, $planId);
        return $res->json(["message" => "Plan asignado"]);
    }

    public function removePlanFromUser($req, $res) {
        $userId = $req->body['userId'];
        $planId = $req->body['planId'];
        $this->service->removePlan($userId, $planId);
        return $res->json(["message" => "Plan removido"]);
    }
}
