<?php 

use Src\Service\Domain\DomainsSearcherService;

final readonly class DomainsGetController {

    private DomainsSearcherService $service;

    public function __construct() {
        $this->service = new DomainsSearcherService();
    }

    public function start(): void 
    {
        $response = $this->service->search();
        echo json_encode($this->filterResponses($response), true);
    }

    private function filterResponses(array $responses): array
    {
        $result = [];

        foreach ($responses as $response) {
            $result[] = [
                "id" => $response->id(),
                "name" => $response->name(),
                "code" => $response->code()
            ];
        }

        return $result;
    }
}
