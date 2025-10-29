<?php 

namespace Src\Infrastructure\Repository\PlanAlimento;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\PlanAlimento\PlanAlimento;

final readonly class PlanAlimentoRepository extends PDOManager implements PlanAlimentoRepositoryInterface 
{
    public function findByPlanUser(int $id): array {
        $query = <<<SQL
            SELECT * FROM plan_alimentos
            WHERE id_plans_user = :id AND deleted = 0
        SQL;

        $parameters = [ "id" => $id ];
        $results = $this->execute($query, $parameters);

        $planAlimentos = [];
        foreach($results as $result) {
            $planAlimentos[] = $this->toPlanAlimento($result);
        }

        return $planAlimentos;
    }

    public function find(int $id): ?PlanAlimento
    {
        $query = <<<SQL
            SELECT * FROM plan_alimentos
            WHERE id = :id AND deleted = 0
        SQL;

        $parameters = [ "id" => $id ];
        $results = $this->execute($query, $parameters);

        if (count($results) === 0) {
            return null;
        }

        return $this->toPlanAlimento($results[0]);
    }

    public function search(): array
    {
        $query = "SELECT * FROM plan_alimentos WHERE deleted = 0";
        $results = $this->execute($query);

        $planAlimentos = [];
        foreach ($results as $result) {
            $planAlimentos[] = $this->toPlanAlimento($result);
        }

        return $planAlimentos;
    }

    public function create(PlanAlimento $planAlimento): void
    {
        $query = <<<SQL
            INSERT INTO plan_alimentos (description, tipo, dias, id_plans_user, deleted)
            VALUES (:description, :tipo, :dias, :id_plans_user, :deleted)
        SQL;

        $parameters = [
            "description"     => $planAlimento->description(),
            "tipo"            => $planAlimento->tipo(),
            "dias"            => $planAlimento->dias(),
            "id_plans_user"   => $planAlimento->idPlansUser(),
            "deleted"         => $planAlimento->deleted()
        ];

        $this->execute($query, $parameters);
    }

    public function update(PlanAlimento $planAlimento): void
    {
        $query = <<<SQL
            UPDATE plan_alimentos
            SET description = :description,
                tipo = :tipo,
                dias = :dias,
                id_plans_user = :id_plans_user
            WHERE id = :id AND deleted = 0
        SQL;

        $parameters = [
            "id"             => $planAlimento->id(),
            "description"    => $planAlimento->description(),
            "tipo"           => $planAlimento->tipo(),
            "dias"           => $planAlimento->dias(),
            "id_plans_user"  => $planAlimento->idPlansUser()
        ];

        $this->execute($query, $parameters);
    }

    // borrado lógico
    public function delete(int $id): void
    {
        $query = "UPDATE plan_alimentos SET deleted = 1 WHERE id = :id";
        $parameters = [ "id" => $id ];
        $this->execute($query, $parameters);
    }
    // PlanAlimentoRepository.php

public function createForUser(PlanAlimento $planAlimento): void
{
    $query = <<<SQL
        INSERT INTO plan_alimentos (description, tipo, dias, id_plans_user, deleted)
        VALUES (:description, :tipo, :dias, :id_plans_user, 0)
    SQL;

    $params = [
        "description" => $planAlimento->description(),
        "tipo" => $planAlimento->tipo(),
        "dias" => $planAlimento->dias(),
        "id_plans_user" => $planAlimento->plansUserId(),
    ];

    $this->execute($query, $params);
}


public function updateForUser(PlanAlimento $planAlimento): void
{
    $query = <<<SQL
        UPDATE plan_alimentos
        SET description = :description, tipo = :tipo, dias = :dias
        WHERE id = :id AND deleted = 0
    SQL;

    $params = [
        "id" => $planAlimento->id(),
        "description" => $planAlimento->description(),
        "tipo" => $planAlimento->tipo(),
        "dias" => $planAlimento->dias(),
    ];

    $this->execute($query, $params);
}


    private function toPlanAlimento(?array $primitive): ?PlanAlimento
    {
        if ($primitive === null) {
            return null;
        }

        return new PlanAlimento(
            $primitive["id"],
            $primitive["description"],
            $primitive["tipo"],
            $primitive["dias"],
            $primitive["id_plans_user"],
            $primitive["deleted"] ?? 0
        );
    }
}
