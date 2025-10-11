<?php 

declare(strict_types = 1);

namespace Src\Utils;

use Exception;

final readonly class ControllerUtils {

    public static function getPost(string $name, bool $required = true, mixed $default = null): mixed 
    {
        $postData = self::getPostData();
        
        $value = $postData[$name] ?? null;

        if ($required && $value === null) {
            throw new Exception(sprintf("Parameter %s not found", $name));
        } 

        return $value ?? $default;
    }

    // ✅ Método seguro que nunca devuelve null
    private static function getPostData(): array
    {
        $json = file_get_contents('php://input');
        
        if (empty($json)) {
            return [];
        }
        
        $postData = json_decode($json, true);

        // Si JSON inválido o no es array, devolvemos array vacío
        if (!is_array($postData)) {
            return [];
        }

        return $postData;
    }

    public static function getFile(string $name, bool $required = true, mixed $default = null): mixed 
    {
        $fileData = self::getFileData();
        
        $value = $fileData[$name] ?? null;

        if ($required && $value === null) {
            throw new Exception(sprintf("Parameter %s not found", $name));
        } 

        return $value ?? $default;
    }

    private static function getFileData(): array
    {
        return $_FILES;
    }

    public static function getHeaderToken(): string
    {
        $headers = getallheaders();
        $token = $headers['x-api-key'] ?? null;
        if ($token === null) throw new Exception("Token not found");
        return $token;
    }
}
