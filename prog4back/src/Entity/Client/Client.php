<?php 

namespace Src\Entity\Client;

final class Client {
    public function __construct(
        private readonly ?int $id,
        private int $dni,
        private string $name,
        private string $surname,
        

    ) {
    }
    public static function create(int $dni, string $name, string $surname ): self
    {
        return new self(null, $dni, $name, $surname);
    }
    public function modify(int $dni, string $name, string $surname): void {
        $this->dni = $dni;
        $this->name = $name;
        $this->surname = $surname;
    }


    public function id(): ?int
    {
        return $this->id;
    }
    public function name(): string
    {
        return $this->name;
    }

    public function dni(): int
    {
        return $this->dni;
    }
    public function surname(): string
    {
        return $this->surname;
    }

}