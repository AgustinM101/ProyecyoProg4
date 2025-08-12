<?php 

namespace Src\Infrastructure\PDO;

use PDO;
use PDOException;

final class PDOClient {

    /** @var PDO[] $activeClients */
    private static array $activeClients = [];

    public function connect(): PDO
    {
        $client = $this->client();

        if ($client === null) {
            $client = $this->connectClient();
        }

        return $client;
    }

    private function client(): ?PDO
    {
        return self::$activeClients[$_ENV['DATABASE_USER']] ?? null;
    }


    private function connectClient(): PDO
    {
        try {
            $conn = new PDO(
                $this->generateUrl(),
                $_ENV['DATABASE_USER'],
                $_ENV['DATABASE_PASSWORD']
            );
            
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            self::$activeClients[$_ENV['DATABASE_USER']] = $conn;

            return $conn;
        } catch (PDOException $e) {
            echo "Hubo un error en la base de datos ".$e->getMessage();
            exit();
        }
    }

    private function generateUrl(): string
    {
        return sprintf(
            '%s:host=%s;dbname=%s',
            $_ENV['DATABASE_DRIVER'],
            sprintf('%s:%s', $_ENV['DATABASE_HOST'], $_ENV['DATABASE_PORT']),
            $_ENV['DATABASE_NAME']
        );
    }
}