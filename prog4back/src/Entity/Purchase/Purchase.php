<?php

namespace Src\Entity\Purchase;

final readonly class Purchase
{
    public function __construct(
        private readonly ?int $id,
        private readonly ?int $plansUserId, // ✅ puede ser null
        private readonly float $amount,
        private readonly string $paymentMethod,
        private readonly string $status,
        private readonly ?string $preferenceId = null,
        private readonly ?string $createdAt = null
    ) {
    }

    public static function create(
        ?int $plansUserId, // ✅ parámetro ahora opcional
        float $amount,
        string $paymentMethod,
        string $status = 'pending',
        ?string $preferenceId = null
    ): self {
        return new self(
            null, // id
            $plansUserId, // ✅ puede venir null
            $amount,
            $paymentMethod,
            $status,
            $preferenceId,
            date('Y-m-d H:i:s')
        );
    }

    public function id(): ?int { return $this->id; }
    public function plansUserId(): ?int { return $this->plansUserId; } // ✅ devuelve nullable
    public function amount(): float { return $this->amount; }
    public function paymentMethod(): string { return $this->paymentMethod; }
    public function status(): string { return $this->status; }
    public function preferenceId(): ?string { return $this->preferenceId; }
    public function createdAt(): ?string { return $this->createdAt; }
}



