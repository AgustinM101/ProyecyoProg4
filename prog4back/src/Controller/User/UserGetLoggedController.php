<?php 

use Src\Utils\ControllerUtils;
use Src\Infrastructure\Repository\PlansUser\PlansUserRepository;
use Src\Infrastructure\Repository\Plan\PlanRepository;
use Src\Infrastructure\Repository\User\UserRepository;

final readonly class UserGetLoggedController {

    private UserRepository $service;
    private PlansUserRepository $plansUserRepository;
    private PlanRepository $planRepository;

    public function __construct() {
        $this->service = new UserRepository();
        $this->plansUserRepository = new PlansUserRepository();
        $this->planRepository = new PlanRepository();
    }

    public function start(): void
    {
        $token = ControllerUtils::getHeaderToken();
        $user = $this->service->findByToken($token);

        $plansUsers = $this->plansUserRepository->findByUserId($user->id());
        $planUser = $plansUsers[0] ?? null;

        $plan = null;

        if ($planUser != null) {
            $plan = $this->planRepository->find($planUser->id_plan());
        }

        echo json_encode([
            "token" => $user->id(),
            "name" => $user->name(),
            "email" => $user->email(),
            "role" => $user->role(),
            "plan" => $plan != null ? [
                "id" => $plan->id(),
                "name" => $plan->name(),
                "description" => $plan->description(),
                "price" => $plan->price()
            ] : null
        ]);
    }
}