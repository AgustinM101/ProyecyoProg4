<?php 

namespace Src\Infrastructure\Repository\PlanEjercicio;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\PlanEjercicio\PlanEjercicio;

final readonly class PlanEjercicioRepository extends PDOManager implements PlanEjercicioRepositoryInterface 
{
    public function findByPlanUser(int $id): array {
        $query = <<<SQL
            SELECT * FROM plan_ejercicios
            WHERE id_plans_user = :id AND deleted = 0
        SQL;

        $results = $this->execute($query, [ "id" => $id ]);

        $planEjercicios = [];
        foreach($results as $result) {
            $planEjercicios[] = $this->toPlanEjercicio($result);
        }

        return $planEjercicios;
    }

    public function findForUser(int $id_plans_user, int $id): ?PlanEjercicio
    {
        $query = <<<SQL
            SELECT * FROM plan_ejercicios
            WHERE id = :id
            AND id_plans_user = :id_plans_user
            AND deleted = 0
        SQL;

        $params = [
            "id" => $id,
            "id_plans_user" => $id_plans_user
        ];

        $results = $this->execute($query, $params);

        if (count($results) === 0) {
            return null;
        }

        return $this->toPlanEjercicio($results[0]);
    }

    public function find(int $id): ?PlanEjercicio
    {
        $query = <<<SQL
            SELECT * FROM plan_ejercicios
            WHERE id = :id AND deleted = 0
        SQL;

        $results = $this->execute($query, [ "id" => $id ]);

        if (count($results) === 0) {
            return null;
        }

        return $this->toPlanEjercicio($results[0]);
    }

    public function search(): array
    {
        $query = "SELECT * FROM plan_ejercicios WHERE deleted = 0";
        $results = $this->execute($query);

        $planEjercicios = [];
        foreach ($results as $result) {
            $planEjercicios[] = $this->toPlanEjercicio($result);
        }

        return $planEjercicios;
    }

    public function create(PlanEjercicio $planEjercicio): void
    {
        $query = <<<SQL
            INSERT INTO plan_ejercicios (description, tipo, dias, id_plans_user, deleted)
            VALUES (:description, :tipo, :dias, :id_plans_user, :deleted)
        SQL;

        $this->execute($query, [
            "description"     => $planEjercicio->description(),
            "tipo"            => $planEjercicio->tipo(),
            "dias"            => $planEjercicio->dias(),
            "id_plans_user"   => $planEjercicio->idPlansUser(),
            "deleted"         => $planEjercicio->deleted()
        ]);
    }

    public function update(PlanEjercicio $planEjercicio): void
    {
        $query = <<<SQL
            UPDATE plan_ejercicios
            SET description = :description,
                tipo = :tipo,
                dias = :dias
            WHERE id = :id AND deleted = 0
        SQL;

        $this->execute($query, [
            "id"             => $planEjercicio->id(),
            "description"    => $planEjercicio->description(),
            "tipo"           => $planEjercicio->tipo(),
            "dias"           => $planEjercicio->dias()
        ]);
    }

    public function delete(int $id): void
    {
        $query = "UPDATE plan_ejercicios SET deleted = 1 WHERE id = :id";
        $this->execute($query, [ "id" => $id ]);
    }

    public function createForUser(PlanEjercicio $planEjercicio): void
    {
        $query = <<<SQL
            INSERT INTO plan_ejercicios (description, tipo, dias, id_plans_user, deleted)
            VALUES (:description, :tipo, :dias, :id_plans_user, 0)
        SQL;

        $this->execute($query, [
            "description" => $planEjercicio->description(),
            "tipo" => $planEjercicio->tipo(),
            "dias" => $planEjercicio->dias(),
            "id_plans_user" => $planEjercicio->idPlansUser(),
        ]);
    }

    public function updateForUser(PlanEjercicio $planEjercicio): void
    {
        $query = <<<SQL
            UPDATE plan_ejercicios
            SET description = :description, tipo = :tipo, dias = :dias
            WHERE id = :id AND deleted = 0
        SQL;

        $this->execute($query, [
            "id" => $planEjercicio->id(),
            "description" => $planEjercicio->description(),
            "tipo" => $planEjercicio->tipo(),
            "dias" => $planEjercicio->dias(),
        ]);
    }

    private function toPlanEjercicio(?array $primitive): ?PlanEjercicio
    {
        if ($primitive === null) {
            return null;
        }

        return new PlanEjercicio(
            $primitive["id"],
            $primitive["description"],
            $primitive["tipo"],
            $primitive["dias"],
            $primitive["id_plans_user"],
            $primitive["deleted"] ?? 0
        );
    }
}
