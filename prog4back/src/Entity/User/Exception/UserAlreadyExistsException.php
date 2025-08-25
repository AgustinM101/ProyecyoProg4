<?php 

namespace Src\Entity\User\Exception;

use Exception;

final class UserAlreadyExistsException extends Exception {
    public function __construct() {
        parent::__construct('El email ingresado ya se encuentra en uso.');
    }
}