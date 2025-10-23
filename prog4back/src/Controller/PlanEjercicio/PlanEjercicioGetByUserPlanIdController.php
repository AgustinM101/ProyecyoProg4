<?php
namespace Src\Controller\PlanEjercicio;

use Src\Core\Controller;
use Src\Core\Request;
use Src\Core\Response;
use Src\Service\PlanEjercicio\PlanEjercicioUserFinderService;

class PlanEjercicioGetByUserPlanIdController extends Controller
{
    private PlanEjercicioUserFinderService $finderService;

    public function __construct(PlanEjercicioUserFinderService $finderService)
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

            $planEjercicio = $this->finderService->findByPlanUser((int)$id);

            if (empty($planEjercicio)) {
                return $response->json([
                    'success' => false,
                    'message' => "No se encontraron ejercicios asociados al plan del usuario."
                ], 404);
            }

            // 🔹 Forzar array indexado 0..n para que JSON siempre sea un array
            $planEjercicio = array_values($planEjercicio);

            return $response->json([
                'success' => true,
                'data' => $planEjercicio
            ], 200);

        } catch (\Throwable $e) {
            return $response->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
