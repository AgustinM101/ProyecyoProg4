<?php

declare(strict_types=1);

namespace Src\Utils;

use Exception;

final readonly class ControllerUtils
{
    public static function getPost(string $name, bool $required = true, mixed $default = null): mixed
    {
        $postData = self::getPostData();

        $value = $postData[$name] ?? null;

        if ($required && $value === null) {
            throw new Exception(sprintf("Parameter %s not found", $name));
        }
        return $value ?? $default;
    }


    public static function getPostData(): array
    {
        $json = file_get_contents('php://input');
        if (empty($json)) {
            return [];
        }
        $postData = json_decode($json, true);
        return $postData;
    }

}