<?php
namespace Src\Controller\PlanAlimento;

use Src\Core\Controller;
use Src\Core\Request;
use Src\Core\Response;
use Src\Service\PlanAlimento\PlanAlimentoUserFinderService;

class PlanAlimentosGetByUserPlanIdController extends Controller
{
    private PlanAlimentoUserFinderService $finderService;

    public function __construct(PlanAlimentoUserFinderService $finderService)
    {
        $this->finderService = $finderService;
    }

    public function handle(Request $request, Response $response): Response
    {
        try {
            $id = $request->getQueryParam('id');

            if (!$id) {
                return $response->json([
                    'success' => false,
                    'message' => "Falta el parámetro 'id'."
                ], 400);
            }

            $planAlimentos = $this->finderService->findByPlanUser((int)$id);

            if (empty($planAlimentos)) {
                return $response->json([
                    'success' => false,
                    'message' => "No se encontraron alimentos asociados al plan del usuario."
                ], 404);
            }

            // 🔹 Forzar array indexado 0..n para que JSON siempre sea un array
            $planAlimentos = array_values($planAlimentos);

            return $response->json([
                'success' => true,
                'data' => $planAlimentos
            ], 200);

        } catch (\Throwable $e) {
            return $response->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
