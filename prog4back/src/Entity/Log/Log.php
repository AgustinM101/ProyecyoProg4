<?php

namespace Src\Entity\Log;

final class Log
{
    private ?int $id;
    private string $text;
    private string $created_at;
    private bool $is_alert;

    public function __construct(?int $id, string $text, string $created_at, bool $is_alert)
    {
        $this->id = $id;
        $this->text = $text;
        $this->created_at = $created_at;
        $this->is_alert = $is_alert;
    }

    public function id(): ?int { return $this->id; }
    public function text(): string { return $this->text; }
    public function created_at(): string { return $this->created_at; }
    public function is_alert(): bool { return $this->is_alert; }
}
