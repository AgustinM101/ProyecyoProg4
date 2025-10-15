<?php
// repositories/PurchaseRepository.php
require_once __DIR__ . '/../entities/Purchase.php';

class PurchaseRepository {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function save(Purchase $purchase) {
        $stmt = $this->conn->prepare("
            INSERT INTO purchases (user_id, plan, amount, payment_method, status, created_at, preference_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->bind_param(
            "isdssss",
            $purchase->userId,
            $purchase->plan,
            $purchase->amount,
            $purchase->paymentMethod,
            $purchase->status,
            $purchase->createdAt,
            $purchase->preferenceId
        );

        if (!$stmt->execute()) {
            throw new Exception("Error al guardar la compra: " . $stmt->error);
        }

        return $this->conn->insert_id;
    }

    public function updateStatus($id, $status) {
        $stmt = $this->conn->prepare("UPDATE purchases SET status = ? WHERE id = ?");
        $stmt->bind_param("si", $status, $id);
        return $stmt->execute();
    }
}

