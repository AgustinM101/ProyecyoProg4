<?php 


namespace Src\Entity\User;

use DateTime;
use Src\Entity\Plan\Plan;

final class User {

    public function __construct(
        private readonly ?int $id,
        private string $name,
        private string $email,
        private string $password,
        
        private ?string $token = null,
        private ?DateTime $tokenAuthDate = null,
        private ?int $admin = 0,
        private int $deleted = 0, 
        private ?string $profileImage = null,
    ) {}

    // Factory para crear nuevo usuario
    public static function create(string $name, string $email, string $password, ?int $admin = 0): self
    {
        return new self(
            null,
            $name,
            $email,
            password_hash($password, PASSWORD_BCRYPT),   
            null, // Token
            null, // Token Auth date
            $admin,
            0, // Deleted
            null // Profile image
        );
    }

    // Getters
    public function id(): ?int { return $this->id; }
    public function name(): string { return $this->name; }
    public function email(): string { return $this->email; }
    public function password(): string { return $this->password; }
    
    public function profileImage(): ?string { return $this->profileImage; }
    public function token(): ?string { return $this->token; }
    public function tokenAuthDate(): ?DateTime { return $this->tokenAuthDate; }
    public function admin(): ?int { return $this->admin; }
    public function plan(): ?Plan { return $this->plan; }
    public function deleted(): int { return $this->deleted; }



    // Setters
    public function setName(string $name): void { $this->name = $name; }
    public function setEmail(string $email): void { $this->email = $email; }
    public function setPassword(string $password): void { $this->password = password_hash($password, PASSWORD_BCRYPT); }
    
    public function setProfileImage(?string $path): void { $this->profileImage = $path; }
    public function setPlan(?Plan $plan): void { $this->plan = $plan; }
    public function setDeleted(int $deleted): void { $this->deleted = $deleted; }


    // Modificación existente
    public function modify(string $name, string $email, string $password): void
    {
        $this->setName($name);
        $this->setEmail($email);
        $this->setPassword($password);
    }

    // Generar token
    public function generateToken(): void
    {
        $this->token = md5($this->email.$this->id.rand(1000, 9999).date("YmdHis"));
        $this->tokenAuthDate = new DateTime("+1 hours");
    }
}
