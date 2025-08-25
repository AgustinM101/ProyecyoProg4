<?php 

namespace Src\Entity\Domain;

final class Domain {

    public function __construct(
        private readonly ?int $id,
        private string $name,
        private string $code,
        private bool $deleted
    ) {
    }

    public static function create(string $name, string $code): self
    {
        return new self(null, $name, $code, false);
    }

    public function modify(string $name, string $code): void
    {
        $this->name = $name;
        $this->code = $code;
    }

    public function delete(): void
    {
        $this->deleted = true;
    }

    public function id(): ?int
    {
        return $this->id;
    }

    public function name(): string
    {
        return $this->name;
    }

    public function code(): string
    {
        return $this->code;
    }

    public function isDeleted(): int
    {
        return $this->deleted ? 1 : 0;
    }
}