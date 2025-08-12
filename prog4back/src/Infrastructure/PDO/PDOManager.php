<?php 

namespace Src\Infrastructure\PDO;

use PDO;

readonly class PDOManager {

	private PDO $client;

	public function __construct() {
		$client = new PDOClient();
		$this->client = $client->connect();
	}

	public function execute(
		string $query,
		array $parameters = []
	): array{



		$stmt = $this->client->prepare($query);
		$stmt->execute($parameters);
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

}