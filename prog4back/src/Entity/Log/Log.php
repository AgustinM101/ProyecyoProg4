<?php

namespace Src\Entity\Log;

final class Log
{
    private ?int $id;
    private string $text;
    private string $fecha_creacion;
    private bool $is_alert;

    public function __construct(?int $id, string $text, string $fecha_creacion, bool $is_alert)
    {
        $this->id = $id;
        $this->text = $text;
        $this->fecha_creacion = $fecha_creacion;
        $this->is_alert = $is_alert;
    }

    public function id(): ?int { return $this->id; }
    public function text(): string { return $this->text; }
    public function fecha_creacion(): string { return $this->fecha_creacion; }
    public function is_alert(): bool { return $this->is_alert; }
}
