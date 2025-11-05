<?php 

namespace Src\Entity\Plan;

final class Plan {
    public function __construct(
        private readonly ?int $id,
        private string $name,
        private string $description,
        private int $price,
        private ?int $deleted = 0
    ) {
    }
    public static function create(string $name, string $description, int $price): self
    {
        return new self(null, $name, $description, $price);
    }
    public function modify(string $name, string $description, int $price): void {
        $this->name = $name;
        $this->description = $description;
        $this->price = $price;
        
    }

    public function delete(): void {
        $this->deleted = 1;
    }
    public function id(): ?int
    {
        return $this->id;
    }
    public function name(): string
    {
        return $this->name;
    }


    public function description(): string
    {
        return $this->description;
    }

    public function price(): int
    {
        return $this->price;
    }

}
