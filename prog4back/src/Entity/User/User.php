<?php 

namespace Src\Entity\User;

final class User {
    public function __construct(
        private readonly ?int $id,
        private string $name,
        private string $email,
        private string $password,
        private string $token,
        private date $token_expiration_date,
        

    ) {
    }


    public function id(): ?int
    {
        return $this->id;
    }
    public function name(): string
    {
        return $this->name;
    }

    public function email(): string
    {
        return $this->email;
    }
    public function password(): string
    {
        return $this->password;
    }
    public function token(): string
    {
        return $this->token;
    }
    public function token_expiration_date(): date
    {
        return $this->token_expiration_date;
    }

}