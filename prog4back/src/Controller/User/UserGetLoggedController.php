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

    if (!$token) {
        http_response_code(401);
        echo json_encode(["status" => 401, "message" => "Token not found"]);
        return;
    }

    $user = $this->service->findByToken($token);


    if ($user === null) {
        http_response_code(401);
        echo json_encode(["status" => 401, "message" => "Invalid or expired token"]);
        return;

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
            "id" => $user->id(),
            "name" => $user->name(),
            "email" => $user->email(),
            "role" => $user->role(),
            "planUser" => $planUser != null ? [
                "id" => $planUser->id(),
                "id_user" => $planUser->id_user(),
                "id_plan" => $planUser->id_plan(),
                "status" => $planUser->status(),
                "expiration_date" => $planUser->expiration_date(),

                "plan" => $plan != null ? [
                    "id" => $plan->id(),
                    "name" => $plan->name(),
                    "description" => $plan->description(),
                    "price" => $plan->price()
                ] : null
            ] : null,
        ]);

    }

    $plansUsers = $this->plansUserRepository->findByUserId($user->id());
    $planUser = $plansUsers[0] ?? null;

    $plan = null;

    if ($planUser != null) {
        $plan = $this->planRepository->find($planUser->id_plan());
    }

    echo json_encode([
        "id" => $user->id(),
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