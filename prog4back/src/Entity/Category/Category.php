<?php 

namespace Src\Entity\Category;

final class Category {
    public function __construct(
        private readonly ?int $id,
        private string $name,
        private string $imageUrl,
        private int $deleted = 0

    ) {
    }
        public function delete(): void
    {
        $this->deleted = 1;
    }

    public function deleted(): int
    {
        return $this->deleted ? 1 : 0;
    }
    public function modify( string $name, string $imageUrl): void {
        $this->name = $name;
        $this->imageUrl = $imageUrl;
    }
    
    public static function create(string $name, string $imageUrl ): self
    {
        return new self(null, $name, $imageUrl, false);
    }

    public function id(): ?int
    {
        return $this->id;
    }
    public function name(): string
    {
        return $this->name;
    }
    public function imageUrl(): string
    {
        return $this->imageUrl;
    }

}