<?php 

namespace Src\Entity\File\Exception;

use Exception;

final class FileNotUploadedException extends Exception {
    public function __construct() {
        parent::__construct("Hubo un error al subir el archivo al servidor.");
    }
}