<?php 

declare(strict_types = 1);

namespace Src\Service\File;

use Src\Infrastructure\Repository\File\FileRepository;
use Src\Entity\File\File;
use Src\Entity\File\Exception\FileNotUploadedException;

final readonly class FileUploaderService {

    private FileRepository $repository;

    public function __construct() 
    {
        $this->repository = new FileRepository();
    }

    public function upload(string $name, string $fullPath, string $type, string $tmpName, int $size): File 
    {
        $file = File::create($name, $fullPath, $type, $tmpName, $size);
        
        $file = $this->repository->upload($file);
        
        if ($file->uploadUrl() === null) {
            throw new FileNotUploadedException();
        }

        return $file;
    }

}

