<?php



use Src\Service\PlanAlimento\PlanAlimentosSearcherService;

final readonly class PlanAlimentosGetController {
    private PlanAlimentosSearcherService $service;

    public function __construct() {
        $this->service = new PlanAlimentosSearcherService();
    }

    public function start(): void
    {
        $planAlimentos = $this->service->search();
        echo json_encode($this->toResponse($planAlimentos));
    }

    private function toResponse(array $planAlimentos): array
    {
        $responses = [];
        foreach ($planAlimentos as $planAlimento) {
            $responses[] = [
                "id" => $planAlimento->id(),
                "name" => $planAlimento->name(),
                "description" => $planAlimento->description(),
                "tipo" => $planAlimento->tipo()
            ];
        }
        return $responses;
    }
}
