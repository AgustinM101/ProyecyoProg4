<?php

namespace Src\Entity\PlanAlimento;

final class PlanAlimento {

    public function __construct(
        private readonly ?int $id,
        private string $description,
        private string $tipo,
        private string $dias,
        private int $id_plans_user,
        private int $deleted = 0,
    ) {}

    // Factory: crear nuevo registro
    public static function create(
        string $description,
        string $tipo,
        string $dias,
        int $id_plans_user
    ): self
    {
        return new self(
            null,              // id autogenerado
            $description,
            $tipo,
            $dias,
            $id_plans_user,
            0                  // deleted por defecto
        );
    }

    // Getters
    public function id(): ?int { return $this->id; }
    public function description(): string { return $this->description; }
    public function tipo(): string { return $this->tipo; }
    public function dias(): string { return $this->dias; }
    public function idPlansUser(): int { return $this->id_plans_user; }
    public function deleted(): int { return $this->deleted; }

    // Setters
    public function setDescription(string $description): void { $this->description = $description; }
    public function setTipo(string $tipo): void { $this->tipo = $tipo; }
    public function setDias(string $dias): void { $this->dias = $dias; }
    public function setIdPlansUser(int $id): void { $this->id_plans_user = $id; }
    public function setDeleted(int $deleted): void { $this->deleted = $deleted; }

    // Modificación con datos
    public function modify(string $description, string $tipo, string $dias): void
    {
        $this->setDescription($description);
        $this->setTipo($tipo);
        $this->setDias($dias);
    }
}
