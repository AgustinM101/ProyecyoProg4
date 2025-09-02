<?php 
declare(strict_types = 1);


namespace Src\Infrastructure\Repository\File;

use Src\Entity\File\File;
use Src\Infrastructure\S3\S3Manager;

final readonly class FileRepository extends S3Manager implements FileRepositoryInterface {

    public function upload(File $file): File
    {
        return $this->doUpload($file);
    }
}