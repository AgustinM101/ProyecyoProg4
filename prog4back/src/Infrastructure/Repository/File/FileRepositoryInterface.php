<?php 

declare(strict_types = 1);

namespace Src\Infrastructure\Repository\File;

use Src\Entity\File\File;

interface FileRepositoryInterface {
    public function upload(File $file): File;
}