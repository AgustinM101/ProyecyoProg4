<?php 

namespace Src\Entity\PlanEjercicio;

final class PlanEjercicio {
    public function __construct(
        private readonly ?int $id,
        private string $name,
        private int $durationValor,
        private string $durationUnidad,
        private string $tipo,
        private string $description
        

    ) {
    }
    public static function create(string $name,int $durationValor, string $durationUnidad,string $tipo,string $description ): self
    {
        return new self(null,$name, $durationValor,$durationUnidad,$tipo,$description);
    }
    public function modify( string $name,$durationValor,$durationUnidad,$tipo,$description): void {
        $this->name = $name;
        $this->durationValor = $durationValor;
        $this->durationUnidad = $durationUnidad;
        $this->tipo = $tipo;
        $this->description = $description;
    }


    public function id(): ?int
    {
        return $this->id;
    }
    public function name(): string
    {
        return $this->name;
    }

    public function durationValor(): int
    {
        return $this->durationValor;
    }
    public function durationUnidad(): string
    {
        return $this->durationUnidad;
    }
    public function tipo(): string
    {
        return $this->tipo;
    }
    public function description(): string
    {
        return $this->description;
    }

}