<?php
// entities/Purchase.php
class Purchase {
    public $id;
    public $userId;
    public $plan;
    public $amount;
    public $paymentMethod;
    public $status;
    public $createdAt;

    public function __construct($userId, $plan, $amount, $paymentMethod, $status = 'pending') {
        $this->userId = $userId;
        $this->plan = $plan;
        $this->amount = $amount;
        $this->paymentMethod = $paymentMethod;
        $this->status = $status;
        $this->createdAt = date('Y-m-d H:i:s');
    }
}
