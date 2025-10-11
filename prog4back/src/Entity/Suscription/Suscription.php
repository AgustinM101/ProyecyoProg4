<?php
namespace Src\Entity;

final class Subscription {
    public function __construct(
        private readonly ?int $id,
        private int $id_user,
        private int $id_plan,
        private string $payment_method,
        private string $purchase_date,
        private string $status = "active"
    ) {}

    public static function create(int $id_user, int $id_plan, string $payment_method): self {
        return new self(
            null,
            $id_user,
            $id_plan,
            $payment_method,
            date("Y-m-d H:i:s"),
            "active"
        );
    }
 public function getId(): ?int { return $this->id; }
    public function getUserId(): int { return $this->id_user; }
    public function getPlanId(): int { return $this->id_plan; }
    public function getPaymentMethod(): string { return $this->payment_method; }
    public function getPurchaseDate(): string { return $this->purchase_date; }
    public function getStatus(): string { return $this->status; }
}