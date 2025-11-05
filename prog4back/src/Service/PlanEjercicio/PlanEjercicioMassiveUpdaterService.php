<?php

namespace Src\Service\PlanEjercicio;

<<<<<<< HEAD
=======
use Src\Entity\PlanEjercicio\PlanEjercicio;
>>>>>>> b8a5ec992ad9b8834b68e33b905f724b0cf2072e
use Src\Infrastructure\Repository\PlanEjercicio\PlanEjercicioRepository;
use Src\Service\PlanEjercicio\PlanEjercicioFinderService;

final readonly class PlanEjercicioMassiveUpdaterService
{
    private PlanEjercicioRepository $repository;
    private PlanEjercicioFinderService $finder;

    public function __construct()
    {
        $this->repository = new PlanEjercicioRepository();
        $this->finder = new PlanEjercicioFinderService();
    }

    public function updateAll(int $plansUserId, array $items): void
    {
<<<<<<< HEAD
        foreach ($items as $item) {

            if (!isset($item["id"], $item["descripcion"], $item["tipo"], $item["dia"])) {
                continue;
            }

            $plan = $this->finder->find($item["id"]);

            // seguridad: solo actualiza si pertenece al usuario
            if ($plan->idPlansUser() !== $plansUserId) {
                continue;
            }

            $plan->modify(
                $item["descripcion"],
                $item["tipo"],
                $item["dia"]
            );

            $this->repository->updateForUser($plan);
=======
        $this->repository->deleteAllByPlansUserId($plansUserId);

        foreach ($items as $item) {
            // Cada item debe traer descripcion, tipo y dia
            if (!isset($item["descripcion"], $item["tipo"], $item["dia"])) {
                continue;
            }

            $plan = PlanEjercicio::create(
                $item["descripcion"],
                $item["tipo"],
                $item["dia"],
                $plansUserId
            );

            $this->repository->createForUser($plan);
>>>>>>> b8a5ec992ad9b8834b68e33b905f724b0cf2072e
        }
    }
}
