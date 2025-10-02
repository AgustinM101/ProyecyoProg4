<?php

namespace Src\Entity\PlanEjercicio;

final class PlanEjercicio {
    public function __construct(
        private readonly ?int $id,
        private string $name,
        private string $description,
        private string $tipo
    ) {}

    public function id(): ?int {
        return $this->id;
    }

    public function name(): string {
        return $this->name;
    }

    public function description(): string {
        return $this->description;
    }

    public function tipo(): string {
        return $this->tipo;
    }

    // ✅ Método para serializar a array
    public function toArray(): array {
        return [
            "id" => $this->id(),
            "name" => $this->name(),
            "description" => $this->description(),
            "tipo" => $this->tipo()
        ];
    }
}
