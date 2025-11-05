<?php

namespace Src\Entity\PlansUser;

final class PlansUser {
    public function __construct(
        private ?int $id,
        private int $id_user,
        private int $id_plan,
        private string $status,
        private ?string $expiration_date = null,
        private int $deleted = 0,
    ) {}

    public function modify(string $status, string $expiration_date): void {
        $this->status = $status;
        $this->expiration_date = $expiration_date;
    }
    public function setId(int $id): void {
    $this->id = $id;
}


    public function id(): ?int { 
        return $this->id; 
    }
    
    public function id_user(): int { 
        return $this->id_user; 
    }

    public function id_plan(): int { 
        return $this->id_plan; 
    }

    public function status(): string { 
        return $this->status; 
    }

    public function expiration_date(): ?string {
        return $this->expiration_date;
    }
    public function deleted(): int {
    return $this->deleted;
}

public function markAsDeleted(): void {
    $this->deleted = 1;
}
}
