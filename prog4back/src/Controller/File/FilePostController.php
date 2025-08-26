<?php 

use src\Utils\ControllerUtils;
use Src\Service\File\FileUploaderService;

final readonly class FilePostController {
    private FileUploaderService $service;

    public function __construct() {
        $this->service = new FileUploaderService();
    }

    public function start(): void 
    {
        $file = ControllerUtils::getFile("file");

        $name = $file["name"] ?? '';
        $fullPath = $file["full_path"] ?? '';
        $type = $file["type"] ?? '';
        $tmpName = $file["tmp_name"] ?? '';
        $size = $file["size"] ?? '';

        $uploadedFile = $this->service->upload($name, $fullPath, $type, $tmpName, $size);

        echo json_encode([
            "url" => $uploadedFile->uploadUrl(),
            "size" => $uploadedFile->size(),
            "type" => $uploadedFile->type(),
        ]);
    }
}
