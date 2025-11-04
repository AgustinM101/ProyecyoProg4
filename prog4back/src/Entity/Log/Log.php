<?php

namespace Src\Entity\Log;

final class Log
{
    private ?int $id;
    private string $text;
    private string $created_at;
    private bool $is_alert;
    private int $severity;

    public function __construct(?int $id, string $text, string $created_at, bool $is_alert, int $severity = 1)
    {
        $this->id = $id;
        $this->text = $text;
        $this->created_at = $created_at;
        $this->is_alert = $is_alert;
        $this->severity = $severity; // NUEVO
    }

    public function id(): ?int { return $this->id; }
    public function text(): string { return $this->text; }
    public function created_at(): string { return $this->created_at; }
    public function isAlert(): bool { return $this->is_alert; }
    public function severity(): int { return $this->severity; } // NUEVO GETTER
}
