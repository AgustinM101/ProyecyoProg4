<?php

namespace Src\Infrastructure\Repository\Log;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\Log\Log;

final readonly class LogRepository extends PDOManager implements LogRepositoryInterface
{
    /** @return Log[] */
    public function findAll(): array
    {
        $query = <<<SQL
            SELECT id, text, created_at, is_alert
            FROM logs
            ORDER BY created_at DESC
        SQL;

        $results = $this->execute($query);
        $logs = [];

        foreach ($results as $row) {
            $logs[] = $this->toLog($row);
        }

        return $logs;
    }

    public function findById(int $id): ?Log
    {
        $query = <<<SQL
            SELECT id, text, created_at, is_alert
            FROM logs
            WHERE id = :id
        SQL;

        $result = $this->execute($query, ["id" => $id]);
        return !empty($result) ? $this->toLog($result[0]) : null;
    }

    public function create(Log $log): void
    {
        $query = <<<SQL
            INSERT INTO logs (text, created_at, is_alert)
            VALUES (:text, :created_at, :is_alert)
        SQL;

        $params = [
            "text" => $log->text(),
            "created_at" => $log->created_at(),
            "is_alert" => $log->isAlert() ? 1 : 0
        ];

        $this->execute($query, $params);
    }

    public function delete(int $id): void
    {
        $query = "DELETE FROM logs WHERE id = :id";
        $this->execute($query, ["id" => $id]);
    }

    private function toLog(?array $row): ?Log
    {
        if ($row === null) return null;

        return new Log(
            $row["id"] ?? null,
            $row["text"],
            $row["created_at"],
            (bool)$row["is_alert"]
        );
    }
}
