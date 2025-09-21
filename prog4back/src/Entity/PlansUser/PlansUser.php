<?php

namespace Src\Entity\PlansUser;

final class PlansUser {
    public function __construct(
        private ?int $id,
        private int $id_user,
        private int $id_plan,
        private string $status
    ) {}

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
}
