<?php

declare(strict_types=1);

namespace Src\Infrastructure\S3;

use Aws\S3\S3Client as AWSClient;

final class S3Client {
    /** @var AWSClient[] $activeClients */
    private static array $activeClients = [];

    public function connect(): AWSClient
    {
        $client = $this->client();

        if ($client === null) {
            $client = $this->connectClient();
        }

        return $client;
    }

    private function client(): ?AWSClient
    {
        return self::$activeClients[$_ENV['AWS_S3_KEY']] ?? null;
    }

    private function connectClient(): AWSClient
    {
        $s3Client = new AWSClient([
            'version' => 'latest',
            'region'  => 'us-east-1',
            'endpoint' => $_ENV['AWS_S3_URL'],
            'use_path_style_endpoint' => true,
            'credentials' => [
                'key'    => $_ENV['AWS_S3_KEY'],
                'secret' => $_ENV['AWS_S3_SECRET_KEY'],
            ],
        ]);

        self::$activeClients[$_ENV['AWS_S3_KEY']] = $s3Client;

        return $s3Client;
    }
}