<?php 

declare(strict_types = 1);

namespace Src\Utils;

use Exception;
use Src\Service\Log\LogCreatorService;


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

   private static function getPostData(): array
{
    $json = file_get_contents('php://input');
    $data = [];

    // Intentamos decodificar JSON
    if (!empty($json)) {
        $decoded = json_decode($json, true);
        if (is_array($decoded)) {
            $data = $decoded;
        }
    }

    // Si no vino JSON, usamos $_POST (por multipart/form-data)
    if (empty($data) && !empty($_POST)) {
        $data = $_POST;
    }

    return $data;
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

    public static function logAction(string $text, bool $isAlert = false, int $severity = 1): void
    {
        try {
            $logService = new LogCreatorService();
            $logService->create($text, $isAlert, $severity);
        } catch (\Exception $e) {
            error_log("Error creando log: " . $e->getMessage());
        }
    }


}
