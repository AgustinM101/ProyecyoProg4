<?php



use Src\Service\PlanEjercicio\PlanEjerciciosSearcherService;

final readonly class PlanEjerciciosGetController {
    private PlanEjerciciosSearcherService $service;

    public function __construct() {
        $this->service = new PlanEjerciciosSearcherService();
    }

    public function start(): void
    {
        $planEjercicios = $this->service->search();
        echo json_encode($this->toResponse($planEjercicios));
    }

    private function toResponse(array $planEjercicios): array
    {
        $responses = [];
        foreach ($planEjercicios as $planEjercicio) {
            $responses[] = [
                "id" => $planEjercicio->id(),
                "name" => $planEjercicio->name(),
                "description" => $planEjercicio->description(),
                "tipo" => $planEjercicio->tipo()
            ];
        }
        return $responses;
    }
}
