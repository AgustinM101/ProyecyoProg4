<?php 

namespace Src\Entity\Article\Exception;

use Exception;

final class ArticleNotFoundException extends Exception {
    public function __construct(int $id) {
        parent::__construct("No se encontro el articulo correspondiente. Id: ".$id);
    }
}