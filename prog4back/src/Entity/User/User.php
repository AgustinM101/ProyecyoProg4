<?php 

namespace Src\Entity\User;

use DateTime;

final class User {

    public function __construct(
        private readonly ?int $id,
        private string $name,
        private string $email,
        private string $password,
        private ?string $token,
        private ?DateTime $tokenAuthDate
    ) {
    }

    public static function create(string $name, string $email, string $password): self
    {
        return new self(null, $name, $email, password_hash($password, PASSWORD_BCRYPT), null, null);
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

    public function token(): ?string
    {
        return $this->token;
    }

    public function tokenAuthDate(): ?DateTime
    {
        return $this->tokenAuthDate;
    }

    public function generateToken(): void
    {
        $this->token = md5($this->email.$this->id.rand(1000, 9999).date("YmdHis"));
        $this->tokenAuthDate = new DateTime("+1 hours");
    }
}