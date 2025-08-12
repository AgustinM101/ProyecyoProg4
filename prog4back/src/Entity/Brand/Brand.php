<?php 

namespace Src\Entity\Brand;

final  class Brand {
    public function __construct(
        private readonly ?int $id,
        private string $name,
        private string $code,
        private int $deleted = 0
      

    ) { }
        public function delete(): void
    {
        $this->deleted = 1;
    }

    public function deleted(): int
    {
        return $this->deleted ? 1 : 0;
    }
    public function modify(string $name, string $code): void {
        $this->name = $name;
        $this->code = $code;
    }
    public static function create(string $name, string $code ): self
    {
        return new self(null, $name, $code, false);
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

}