<?php 

namespace Src\Entity\PlanAlimento;

final class PlanAlimento {
    public function __construct(
        private readonly ?int $id,
        private string $name,
        private string $description,
        private string $tipo
        

    ) {
    }
    public static function create(string $name, string $description,string $tipo ): self
    {
        return new self(null,$name,$description,$tipo);
    }
    public function modify( string $name,$description,$tipo): void {
        $this->name = $name;
        $this->description = $description;
        $this->tipo = $tipo;
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

    public function tipo(): string
    {
        return $this->tipo;
    }

}