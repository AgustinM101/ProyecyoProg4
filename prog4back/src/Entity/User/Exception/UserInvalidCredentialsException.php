<?php 

namespace Src\Entity\User\Exception;

use Exception;

final class UserInvalidCredentialsException extends Exception {
    public function __construct() {
        parent::__construct('Las credenciales del usuario son invalidas.');
    }
}