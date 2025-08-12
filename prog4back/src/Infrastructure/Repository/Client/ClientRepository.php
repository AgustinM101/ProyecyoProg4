<?php 

namespace Src\Infrastructure\Repository\Client;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\Client\Client;

final readonly class ClientRepository extends PDOManager implements ClientRepositoryInterface {
    public function find(int $id): ?Client
    {
        $query = <<<HEREDOC
                        SELECT 
                            *
                        FROM
                            clients A
                        WHERE
                            A.id = :id
                    HEREDOC;

        $parameters = [
            "id" => $id,
        ];

        $result = $this->execute($query, $parameters);

        return $this->toClient($result[0] ?? null);
    }

    /** @return Client[] */
    public function search(): array
    {
        $query = <<<HEREDOC
                        SELECT
                            *
                        FROM
                            clients A
                    HEREDOC;
        
        $results = $this->execute($query);

        $clients = [];
        foreach($results as $result) {
            $clients[] = $this->toClient($result);
        }

        return $clients;
    }
    public function create(Client $client): void{



        $query = <<< INSERT_QUERY
                        INSERT INTO clients (dni, name, surname)
                        VALUES (:dni, :name,:surname)
                        INSERT_QUERY;
        
        $parameters = [
            "dni" => $client->dni(),
            "name" => $client->name(),
            "surname" => $client->surname(),

           
            
        ];

        $this->execute($query, $parameters);
    }
    public function delete(Client $client): void
    {
        $query = <<< DELETE_QUERY
                        DELETE FROM clients
                        WHERE id = :id
                        DELETE_QUERY;

        $parameters = [
            "id" => $client->id(),
        ];

        $this->execute($query, $parameters);
    }

    public function update(Client $client): void
    {
        $query = <<< UPDATE_QUERY
                        UPDATE clients
                        SET dni = :dni, name = :name, surname = :surname
                        WHERE id = :id
                        UPDATE_QUERY;

        $parameters = [
            "id" => $client->id(),
            "dni" => $client->dni(),
            "name" => $client->name(),
            "surname" => $client->surname(),
        ];

        $this->execute($query, $parameters);
    }   
    private function toClient(?array $primitive): ?Client {
        if ($primitive === null) {
            return null;
        }

        return new Client(
            $primitive["id"],
            $primitive["dni"],
            $primitive["name"],
            $primitive["surname"],

        );
    }
}