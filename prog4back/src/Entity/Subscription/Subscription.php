<?php

namespace Src\Entity\Subscription;

final class Subscription
{
    public function __construct(
        private readonly ?int $id,
        private int $id_user,
        private int $id_plan,
        private string $paymentMethod,
        private string $status,
        private \DateTime $createdAt
    ) {
    }

    // Factory method para crear una nueva suscripción
    public static function create(int $id_user, int $id_plan, string $paymentMethod): self
    {
        return new self(
            null,                // id lo genera la BD
            $id_user,
            $id_plan,
            $paymentMethod,
            "active",            // por defecto activa
            new \DateTime()      // fecha actual
        );
    }

    public function id(): ?int
    {
        return $this->id;
    }
    public function id_user(): int
    {
        return $this->id_user;
    }
    public function id_plan(): int
    {
        return $this->id_plan;
    }
    public function paymentMethod(): string
    {
        return $this->paymentMethod;
    }
    public function status(): string
    {
        return $this->status;
    }
    public function purchaseDate(): \DateTime
    {
        return $this->createdAt;
    }
  <?php

namespace Src\Entity\Subscription;

final class Subscription
{
    public function __construct(
        private readonly ?int $id,
        private int $id_user,
        private int $id_plan,
        private string $paymentMethod,
        private string $status,
        private \DateTime $createdAt
    ) {
    }

    // Factory method para crear una nueva suscripción
    public static function create(int $id_user, int $id_plan, string $paymentMethod): self
    {
        return new self(
            null,                // id lo genera la BD
            $id_user,
            $id_plan,
            $paymentMethod,
            "active",            // por defecto activa
            new \DateTime()      // fecha actual
        );
    }

    // Getters
    public function id(): ?int
    {
        return $this->id;
    }
    public function id_user(): int
    {
        return $this->id_user;
    }
    public function id_plan(): int
    {
        return $this->id_plan;
    }
    public function paymentMethod(): string
    {
        return $this->paymentMethod;
    }
    public function status(): string
    {
        return $this->status;
    }
    public function purchaseDate(): \DateTime
    {
        return $this->createdAt;
    }
    
}


}
